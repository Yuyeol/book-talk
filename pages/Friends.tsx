import Layout from "@/components/layout";

const Friends = () => {
  return (
    <Layout>
      <ul>
        {/* 클릭 시 상세 정보 모달: 함께 읽는 책, 이사람이 읽는책, 친구삭제 */}
        <li>
          <div>사진</div>
          <div>이름, 상태메시지</div>
        </li>
      </ul>
    </Layout>
  );
};
export default Friends;
