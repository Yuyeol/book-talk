import ResponsiveImage from "@/components/core/responsive-image";
import Book from "@/components/icon/book";
import { PRIMARY_GREEN } from "@/constants";
import { UseFormRegisterReturn } from "react-hook-form";
interface IProps {
  bookPreviewImg: string;
  register: UseFormRegisterReturn;
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

const ImageForm = ({ bookPreviewImg, register }: IProps) => {
  return (
    <div className="relative max-w-xs mx-auto mt-8 overflow-hidden">
      {bookPreviewImg ? (
        <>
          <label htmlFor="book-image_change">
            <ResponsiveImage
              src={bookPreviewImg}
              alt="book-image"
              aspectRatio="1"
              objectFit="contain"
              priority
            />
          </label>
          <FileInput register={register} id="book-image_change" />
        </>
      ) : (
        <div className="p-4">
          <label htmlFor="book-image">
            <div className="aspect-[1] border-dotted border-4 border-primary-green rounded-xl flex flex-col justify-center items-center">
              <div className="bg-white border-4 border-primary-green p-2 rounded-xl">
                <Book width={4} color={PRIMARY_GREEN} />
              </div>
              <div className="mt-3 text-soft-black font-semibold text-center">
                책 표지 이미지를
                <br />
                업로드해주세요
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
