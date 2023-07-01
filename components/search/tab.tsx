import { GREY_3, PRIMARY_GREEN } from "@/constants";

interface IProps {
  selectTab: (tab: number) => void;
  currentTab: number;
  tabs: string[];
}

const Tab = ({ selectTab, currentTab, tabs }: IProps) => {
  return (
    <div className="flex gap-2 mt-2">
      {tabs.map((item, i) => (
        <button
          className="w-14 border-white rounded-lg text-soft-white transition-colors duration-300 shadow-md"
          key={i}
          onClick={() => selectTab(i)}
          style={{
            background: currentTab === i ? PRIMARY_GREEN : GREY_3,
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
export default Tab;
