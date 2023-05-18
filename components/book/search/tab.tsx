interface IProps {
  selectTab: (tab: number) => void;
  currentTab: number;
}

const Tab = ({ selectTab, currentTab }: IProps) => {
  return (
    <div className="flex gap-2">
      {["제목", "저자", "태그"].map((item, i) => (
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
