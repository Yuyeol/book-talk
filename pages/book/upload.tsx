import Input from "@/components/core/input";
import ImageForm from "@/components/book/upload/image-form";
import TagForm from "@/components/book/upload/tag-form";
import Layout from "@/components/layout";
import useMutation from "@/lib/client/useMutation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import IconCol from "@/components/header/icon-col";

interface BookForm {
  title: string;
  description?: string;
  author?: string;
  image?: FileList;
}

const Upload = () => {
  const { register, watch, handleSubmit } = useForm<BookForm>();
  const { mutation, loading, data, error } = useMutation("/api/book/upload");

  const [tags, setTags] = useState<string[]>([]);
  // 로직은 나중에 상태관리툴로 관리하자.
  const selectTag = useCallback(
    (id: string) => {
      if (tags.length > 5) {
        alert("태그는 최대 5개까지 선택 가능합니다.");
        return;
      }
      if (tags.includes(id)) {
        setTags(tags.filter((item) => item !== id));
      } else {
        setTags([...tags, id]);
      }
    },
    [tags]
  );

  const [bookImage, setBookImage] = useState("");
  const bookImageWatch = watch("image");
  useEffect(() => {
    if (bookImageWatch && bookImageWatch.length > 0) {
      const file = bookImageWatch[0];
      setBookImage(URL.createObjectURL(file));
    }
  }, [bookImageWatch]);
  const onSubmit = (data: BookForm) => {
    if (loading) return;
    if (!data.title) return alert("책 제목을 입력해주세요.");

    mutation({ ...data, tags });
  };
  return (
    <Layout>
      <Header col1={<TitleCol>Upload Book</TitleCol>} />

      <div className="px-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 이미지 인풋 확인되면 작아지면서 나머지 Input들 노출됨 */}
          <ImageForm
            bookImage={bookImage}
            register={register("image", { required: true })}
          />
          <Input placeholder="책 제목" register={register("title")} />
          <Input placeholder="글쓴이" register={register("author")} />
          <Input placeholder="설명" register={register("description")} />
          {/* input은 마무리할때 안보이게 처리해도될듯. 디자인따라 정해보자 */}
          <TagForm selectTag={selectTag} tags={tags} />
          <button>완료</button>
        </form>
      </div>
    </Layout>
  );
};
export default Upload;
