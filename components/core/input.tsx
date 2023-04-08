import ResponsiveImage from "@/components/core/responsive-image";
import ImageInput from "@/components/create/image-input";
import Book from "@/components/icon/book";
import Plus from "@/components/icon/plus";
import Upload from "@/components/icon/upload";
import Layout from "@/components/layout";
// TODO: 달에쓰는 일기 디자인 참고해서 인풋 구현하기
interface Props {
  placeholder: string;
}

const Input = ({ placeholder }: Props) => (
  <input
    className="block w-full px-3 py-1 mb-2 bg-white border border-gray-300 rounded-md shadow-sm"
    type="text"
    // value=""
    placeholder={placeholder}
  />
);
export default Input;
