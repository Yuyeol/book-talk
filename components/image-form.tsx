import ResponsiveImage from "@/components/core/responsive-image";
import Book from "@/components/icon/book";
import { PRIMARY_GREEN } from "@/constants";
import { UseFormRegisterReturn } from "react-hook-form";
import Profile from "@/components/icon/profile";
interface IProps {
  previewImg: string;
  register: UseFormRegisterReturn;
  type: "profile" | "book";
}

const FileInput = ({
  register,
  id,
}: {
  register: UseFormRegisterReturn;
  id: string;
}) => {
  return (
    <input
      id={id}
      type="file"
      accept="image/*"
      className="absolute hidden"
      {...register}
    />
  );
};

const ImageForm = ({ previewImg, register, type }: IProps) => {
  return (
    <div className="relative max-w-xs mx-auto mt-8 p-4">
      {previewImg ? (
        <div className="overflow-hidden ring-2 ring-offset-1 ring-primary-green rounded-xl bg-soft-white">
          <label htmlFor="book-image_change">
            <ResponsiveImage
              src={previewImg}
              alt="book-image"
              aspectRatio="1"
              objectFit={type === "profile" ? "cover" : "contain"}
              priority
            />
          </label>
          <FileInput register={register} id="book-image_change" />
        </div>
      ) : (
        <div className="p-4">
          <label htmlFor="book-image">
            <div className="aspect-[1] border-dotted border-4 border-primary-green rounded-xl flex flex-col justify-center items-center">
              <div className="bg-white border-4 border-primary-green p-2 rounded-xl">
                {type === "profile" ? (
                  <Profile width={4} color={PRIMARY_GREEN} />
                ) : (
                  <Book width={4} color={PRIMARY_GREEN} />
                )}
              </div>
              <div className="mt-3 text-soft-black font-semibold text-center">
                {type === "profile"
                  ? "변경할 프로필 이미지를"
                  : "북커버 이미지를"}
                <br />
                업로드 해주세요
              </div>
            </div>
          </label>
          <FileInput register={register} id="book-image" />
        </div>
      )}
    </div>
  );
};
export default ImageForm;
