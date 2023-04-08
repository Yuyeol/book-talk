import Input from "@/components/core/input";
import ImageInput from "@/components/create/image-input";
import Layout from "@/components/layout";

interface Props {}

const Create = ({}: Props) => (
  <Layout>
    <div className="px-4">
      <form>
        <ImageInput />
        <Input placeholder="책 제목" />
        <Input placeholder="글쓴이" />
        <Input placeholder="설명" />
      </form>
    </div>
  </Layout>
);
export default Create;
