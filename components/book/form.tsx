import Input from "@/components/core/input";
import ImageForm from "@/components/book/upload/image-form";
import TagInput from "@/components/book/upload/tag-input";
import useMutation from "@/lib/client/useMutation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import uploadImageToS3 from "@/lib/client/uploadImageToS3";
import { useRouter } from "next/router";
import { Book, Tag } from "@prisma/client";
import { urlToFileList } from "@/lib/client/convertImgToFileList";

interface IBookForm {
  title: string;
  description?: string;
  author?: string;
  image?: FileList;
}

interface IBookWithTags extends Book {
  tags: Tag[];
}

interface IProps {
  book?: IBookWithTags;
}

const Form = ({ book }: IProps) => {
  // useSWR 태그 불러오기
  const router = useRouter();
  const { register, watch, handleSubmit, setValue } = useForm<IBookForm>();
  const { data: tagsData } = useSWR("/api/tags");
  const { mutation, loading } = useMutation("/api/book");

  useEffect(() => {
    if (book) {
      book.image &&
        urlToFileList(book.image).then((fileList) => {
          setValue("image", fileList);
        });
      setValue("title", book.title);
      setValue("author", book.author || "");
      setValue("description", book.description || "");
      setSelectedTags(book.tags.map((tag) => tag.id));
    }
  }, [book, setValue]);

  // book image preview
  const [bookPreviewImg, setBookPreviewImg] = useState("");
  const bookImageWatch = watch("image");

  useEffect(() => {
    // form에 입력된 img
    if (bookImageWatch && bookImageWatch.length > 0) {
      setBookPreviewImg(URL.createObjectURL(bookImageWatch[0]));
      return;
    } else if (book?.image) {
      // book에 img가 있다면 가져옴
      setBookPreviewImg(book.image);
    }
  }, [bookImageWatch, book]);

  // select tag event
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const selectTag = useCallback(
    (id: number) => {
      if (selectedTags.length > 5) {
        alert("태그는 최대 5개까지 선택 가능합니다.");
        return;
      }
      if (selectedTags.includes(id)) {
        setSelectedTags(selectedTags.filter((item) => item !== id));
      } else {
        setSelectedTags([...selectedTags, id]);
      }
    },
    [selectedTags]
  );

  // book submit
  const onSubmit = async ({ title, author, description, image }: IBookForm) => {
    const imageSrc = image
      ? // 1. input의 image
        await uploadImageToS3(image[0])
      : "";
    if (loading) return;
    if (!title) return alert("책 제목을 입력해주세요.");
    mutation({
      title,
      author,
      description,
      selectedTags,
      imageSrc,
      id: book ? book.id : 0,
    });
    router.replace("/");
  };

  return (
    <div className="px-4">
      <form>
        {/* 이미지 인풋 확인되면 작아지면서 나머지 Input들 노출됨 */}
        <ImageForm
          bookPreviewImg={bookPreviewImg}
          register={register("image")}
        />
        <Input placeholder="책 제목" register={register("title")} />
        <Input placeholder="글쓴이" register={register("author")} />
        <Input placeholder="설명" register={register("description")} />
        {/* input은 마무리할때 안보이게 처리해도될듯. 디자인따라 정해보자 */}
        {tagsData?.ok && (
          <TagInput
            tags={tagsData.tags}
            selectTag={selectTag}
            selectedTags={selectedTags}
          />
        )}
      </form>
      <button onClick={handleSubmit(onSubmit)}>완료</button>
    </div>
  );
};
export default Form;
