import TagInput from "@/components/book/upload/tag-input";
import useMutation from "@/lib/client/useMutation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import uploadImageToS3 from "@/lib/client/uploadImageToS3";
import { useRouter } from "next/router";
import { urlToFileList } from "@/lib/client/convertImgToFileList";
import { useSession } from "next-auth/react";
import { IBookForm, IBookWithTags } from "@/types";
import useTags from "@/lib/client/useSwr/useTags";
import useBook from "@/lib/client/useSwr/useBook";
import ImageForm from "@/components/image-form";

interface IProps {
  book?: IBookWithTags;
}

const Form = ({ book }: IProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { register, watch, handleSubmit, setValue } = useForm<IBookForm>();
  const { mutate } = useBook(book?.id as number);
  const { data: tagsData } = useTags(session?.user?.id);
  const {
    mutation,
    loading,
    data: bookResData,
  } = useMutation(`/api/books/${book?.id ?? 0}`);
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
    if (loading) return;
    if (!title) return alert("책 제목을 입력해주세요.");
    const imageSrc = image
      ? // 1. input의 image
        await uploadImageToS3(image[0])
      : "";
    mutation(
      {
        title,
        author,
        description,
        selectedTags,
        imageSrc,
      },
      "POST"
    );
  };
  useEffect(() => {
    if (bookResData) {
      mutate();
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookResData]);

  return (
    <div className="p-6">
      <div className="px-4 bg-soft-white rounded-xl border-2 border-primary-green">
        <form>
          {/* 이미지 인풋 확인되면 작아지면서 나머지 Input들 노출됨 */}
          <ImageForm previewImg={bookPreviewImg} register={register("image")} />
          <div className="space-y-2">
            <input
              className="c_input"
              placeholder="책 제목"
              {...register("title")}
            />
            <input
              className="c_input"
              placeholder="글쓴이"
              {...register("author")}
            />
            <input
              className="c_input"
              placeholder="설명"
              {...register("description")}
            />
          </div>
          {tagsData?.ok && (
            <TagInput
              tags={tagsData.tags}
              selectTag={selectTag}
              selectedTags={selectedTags}
            />
          )}
        </form>
        <div className="flex gap-4 justify-center mt-6 mb-8">
          <button
            className={`c_button_block_lg w-32 ${
              !watch("title") && "bg-grey-3"
            }`}
            onClick={handleSubmit(onSubmit)}
          >
            완료
          </button>
          <button
            className="c_button_block_lg w-32"
            onClick={() => router.back()}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
export default Form;
