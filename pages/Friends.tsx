import FriendsItem from "@/components/friends/item";
import Layout from "@/components/layout";

const Friends = () => {
  return (
    <Layout>
      <ul className="px-4 divide-y-2">
        {/* 클릭 시 상세 정보 모달: 함께 읽는 책, 이사람이 읽는책, 친구삭제 */}
        <FriendsItem />
        <FriendsItem />
        <FriendsItem />
      </ul>
    </Layout>
  );
};
export default Friends;
