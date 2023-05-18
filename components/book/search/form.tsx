import XMark from "@/components/icon/x-mark";

interface IProps {
  handleSearchInput: _.DebouncedFunc<
    (e: React.ChangeEvent<HTMLInputElement>) => void
  >;
}
const Form = ({ handleSearchInput }: IProps) => {
  return (
    <div className="relative">
      <input
        onChange={handleSearchInput}
        className="c_input pr-8"
        placeholder="Search"
      />
      <div className="top-1/2 right-2 bg-slate-400 absolute flex items-center justify-center w-4 h-4 -translate-y-1/2 rounded-full">
        <XMark width={0.75} color="white" />
      </div>
    </div>
  );
};
export default Form;
