import Input from "@/components/core/input";
import ImageForm from "@/components/book/upload/image-form";
import TagInput from "@/components/book/upload/tag-input";
import Layout from "@/components/layout";
import useMutation from "@/lib/client/useMutation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import useSWR from "swr";
import uploadImageToS3 from "@/lib/client/uploadImageToS3";

interface BookForm {
  title: string;
  description?: string;
  author?: string;
  image?: FileList;
}

const Upload = () => {
  // useSWR 태그 불러오기
  const { register, watch, handleSubmit } = useForm<BookForm>();
  const { data } = useSWR("/api/tags");
  const { mutation, loading } = useMutation("/api/book");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  // 로직은 나중에 상태관리툴로 관리하자.
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

  const [bookImage, setBookImage] = useState("");
  const bookImageWatch = watch("image");
  useEffect(() => {
    if (bookImageWatch && bookImageWatch.length > 0) {
      const file = bookImageWatch[0];
      setBookImage(URL.createObjectURL(file));
    }
  }, [bookImageWatch]);

  const onSubmit = async ({ title, author, description, image }: BookForm) => {
    const file = image?.[0];
    const imageSrc = file ? await uploadImageToS3(file) : "";

    if (loading) return;
    if (!title) return alert("책 제목을 입력해주세요.");
    mutation({ title, author, description, selectedTags, imageSrc });
  };
  return (
    <Layout>
      <Header col1={<TitleCol>Upload Book</TitleCol>} />
      <div className="px-4">
        <form>
          {/* 이미지 인풋 확인되면 작아지면서 나머지 Input들 노출됨 */}
          <ImageForm
            bookImage={bookImage}
            register={register("image", { required: true })}
          />
          <Input placeholder="책 제목" register={register("title")} />
          <Input placeholder="글쓴이" register={register("author")} />
          <Input placeholder="설명" register={register("description")} />
          {/* input은 마무리할때 안보이게 처리해도될듯. 디자인따라 정해보자 */}
          {data?.ok && (
            <TagInput
              tags={data.tags}
              selectTag={selectTag}
              selectedTags={selectedTags}
            />
          )}
        </form>
        <button onClick={handleSubmit(onSubmit)}>완료</button>
      </div>
    </Layout>
  );
};
export default Upload;
