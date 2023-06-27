import ImageForm from "@/components/image-form";
import uploadImageToS3 from "@/lib/client/uploadImageToS3";
import useMutation from "@/lib/client/useMutation";
import { IProfileForm } from "@/types";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  user?: User;
}

const Form = ({ user }: IProps) => {
  const router = useRouter();

  const { register, watch, handleSubmit, setValue } = useForm<IProfileForm>();
  const { mutation, loading } = useMutation("/api/users");
  const [profilePreviewImg, setProfilePreviewImg] = useState("");

  const onSubmit = async ({ nickname, bio, image }: IProfileForm) => {
    // 이후 프로필 수정 만들때 구현할것
    if (loading) return;
    if (!nickname) return alert("닉네임을 입력해주세요.");
    const imageSrc = image
      ? // 1. input의 image
        await uploadImageToS3(image[0])
      : "";
    mutation(
      {
        nickname,
        bio,
        imageSrc,
      },
      "POST"
    );
  };

  useEffect(() => {
    if (user) {
      setValue("nickname", user.nickname || "");
      setValue("bio", user.bio || "");
    }
  }, [user, setValue]);

  // book image preview
  const profileImageWatch = watch("image");

  useEffect(() => {
    // form에 입력된 img
    if (profileImageWatch && profileImageWatch.length > 0) {
      setProfilePreviewImg(URL.createObjectURL(profileImageWatch[0]));
      return;
    }
  }, [profileImageWatch]);

  return (
    <div className="p-6">
      <div className="px-4 bg-soft-white rounded-xl border-2 border-primary-green">
        <form className="mx-4">
          {/* 이미지 인풋 확인되면 작아지면서 나머지 Input들 노출됨 */}
          <ImageForm
            previewImg={profilePreviewImg}
            register={register("image")}
            imageFit={"cover"}
          />
          <div className="space-y-2">
            <input
              className="c_input"
              placeholder="닉네임"
              {...register("nickname")}
            />
            <input
              className="c_input"
              placeholder="자기소개"
              {...register("bio")}
            />
          </div>
        </form>
        <div className="flex gap-4 justify-center mt-6 mb-8">
          <button
            className={`c_button_block_lg ${!watch("nickname") && "bg-grey-3"}`}
            onClick={handleSubmit(onSubmit)}
          >
            완료
          </button>
          <button className="c_button_block_lg" onClick={() => router.back()}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
export default Form;
