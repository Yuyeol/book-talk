import XMark from "@/components/icon/x-mark";

interface IProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  resetSearch: () => void;
}
const Form = ({ handleSearch, searchValue, resetSearch }: IProps) => {
  return (
    <div className="relative">
      <input
        value={searchValue}
        onChange={handleSearch}
        className="c_input pr-8"
        placeholder="Search"
      />
      <button
        onClick={resetSearch}
        className={`top-1/2 right-2 bg-slate-400 absolute flex items-center justify-center w-4 h-4 -translate-y-1/2 rounded-full transition-all duration-300 ease-in
        ${searchValue ? "opacity-100" : "opacity-0"}`}
      >
        <XMark width={0.75} color="white" />
      </button>
    </div>
  );
};
export default Form;
