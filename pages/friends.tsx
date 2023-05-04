import Item from "@/components/friends/item";
import Header from "@/components/header";
import ToolsCol from "@/components/header/tools-col";
import IconWrapper from "@/components/header/tools-col";
import TitleCol from "@/components/header/title-col";
import Filter from "@/components/icon/filter";
import Layout from "@/components/layout";
import { HEADER_ICON_COLOR, HEADER_ICON_WIDTH } from "@/constants";
import { HeaderIconPortal } from "@/lib/client/portal";

const Friends = () => {
  return (
    <Layout>
      <Header
        col1={<TitleCol>Book</TitleCol>}
        col2={
          <ToolsCol>
            <button>
              <Filter width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </button>
          </ToolsCol>
        }
      />
      <ul className="px-4 divide-y-2">
        {/* 클릭 시 상세 정보 모달: 함께 읽는 책, 이사람이 읽는책, 친구삭제 */}
        {/*  */}
        <Item />
        <Item />
        <Item />
      </ul>
    </Layout>
  );
};
export default Friends;
