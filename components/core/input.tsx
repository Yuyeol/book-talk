import { UseFormRegisterReturn } from "react-hook-form";
interface Props {
  placeholder: string;
  register: UseFormRegisterReturn;
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
