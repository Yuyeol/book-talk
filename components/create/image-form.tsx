import ResponsiveImage from "@/components/core/responsive-image";
import Book from "@/components/icon/book";
import Plus from "@/components/icon/plus";
import Upload from "@/components/icon/upload";
import Layout from "@/components/layout";
import { UseFormRegisterReturn } from "react-hook-form";
interface Props {
  bookImage: string;
  register: UseFormRegisterReturn;
}

const ImageForm = ({ bookImage, register }: Props) => (
  <div className="relative max-w-sm mx-auto mt-8 bg-slate-400">
    {bookImage ? (
      <ResponsiveImage
        src={bookImage}
        alt="book-image"
        aspectRatio="1"
        objectFit="contain"
      />
    ) : (
      <div className="p-4">
        <label htmlFor="book-image">
          <div className="aspect-[1] border-dotted border-4 flex flex-col justify-center items-center">
            <Upload width={16} color="black" />
            <div className="mt-3">
              책 표지 이미지를
              <br />
              업로드해주세요
            </div>
          </div>
        </label>
        <input
          id="book-image"
          type="file"
          accept="image/*"
          className="absolute hidden"
          {...register}
        />
        <div className="absolute px-3 py-1 text-xs text-white rounded-lg bottom-2 right-3 bg-slate-600">
          SKIP UPLOAD
        </div>
      </div>
    )}
  </div>
);
export default ImageForm;
