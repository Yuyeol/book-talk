import Layout from "@/components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import TagForm from "@/components/tags/tag-form";

const Edit = () => {
  const router = useRouter();
  const { data } = useSWR(
    router.query.id ? `/api/tags/${router.query.id}` : null
  );
  return (
    <Layout>
      <TagForm tag={data?.tag} />
    </Layout>
  );
};

export default Edit;
