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
  const [bookPreviewImg, setBookPreviewImg] = useState("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

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
    mutation(
      {
        title,
        author,
        description,
        selectedTags,
        imageSrc,
        // 이거 마음에 안든다. 수정일 경우, 해당 book id, 생성일경우 억지로 id를 0으로 설정한다.
        // form을 edit과 create가 공유하기 때문. 분리하기에는 공통부분이 너무 많다.
        id: book ? book.id : 0,
      },
      "POST"
    );
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
