import Layout from "@/components/layout";

const Tags = () => {
  return (
    <Layout>
      {/* 모달은 포탈로 구현해봐도 될듯 */}
      {/* 태그 추가버튼은 헤더에 구현. 클릭 시 추가/수정 모달 팝업 */}
      <ul>
        {/* 클릭 시 추가/수정모달로 팝업 */}
        {/* 적당히 크게 구현해도 될듯 */}
        <li>tag</li>
      </ul>
    </Layout>
  );
};
export default Tags;
