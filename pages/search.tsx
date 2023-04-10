import Layout from "@/components/layout";
import { useState } from "react";
const TAP_DEFAULT_TEXT_COLOR = "black";
const TAP_ACTIVE_TEXT_COLOR = "white";
const TAP_DEFAULT_BG_COLOR = "white";
const TAP_ACTIVE_BG_COLOR = "black";

const Search = () => {
  const [currentTap, setCurrentTap] = useState(0);
  const selectTap = (index: number) => setCurrentTap(index);
  return (
    <Layout>
      <div className="p-4">
        <div>
          <input placeholder="Search" />
        </div>
        <div className="flex gap-2">
          {["독서중", "보관함", "친구", "태그"].map((item, i) => (
            <button
              className="border-white rounded-full w-14"
              key="item"
              onClick={() => selectTap(i)}
              style={{
                color:
                  currentTap === i
                    ? TAP_ACTIVE_TEXT_COLOR
                    : TAP_DEFAULT_TEXT_COLOR,
                background:
                  currentTap === i ? TAP_ACTIVE_BG_COLOR : TAP_DEFAULT_BG_COLOR,
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="divide-y-2">
          {["a", "b", "c", "d"].map((item, i) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Search;
