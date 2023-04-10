import ResponsiveImage from "@/components/core/responsive-image";
import ImageInput from "@/components/create/image-input";
import Book from "@/components/icon/book";
import Plus from "@/components/icon/plus";
import Upload from "@/components/icon/upload";
import Layout from "@/components/layout";
interface Props {
  placeholder: string;
  register: any;
}

const Input = ({ placeholder, register }: Props) => (
  <input
    className="block w-full px-3 py-1 mb-2 bg-white border border-gray-300 rounded-md shadow-sm"
    type="text"
    {...register}
    placeholder={placeholder}
  />
);
export default Input;
