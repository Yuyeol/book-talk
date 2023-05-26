interface IProps {
  selectTab: (tab: number) => void;
  currentTab: number;
  tabs: string[];
}

const Tab = ({ selectTab, currentTab, tabs }: IProps) => {
  return (
    <div className="flex gap-2">
      {tabs.map((item, i) => (
        <button
          className="w-14 border-white rounded-md"
          key={i}
          onClick={() => selectTab(i)}
          style={{
            color: currentTab === i ? "black" : "white",
            background: currentTab === i ? "white" : "black",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
export default Tab;
