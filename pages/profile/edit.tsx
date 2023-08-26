import Seo from "@/components/Seo";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/profile/edit/form";
import useUser from "@/lib/client/useSwr/useUser";
import { useSession } from "next-auth/react";

const TITLE = "내 프로필 수정";

const Edit = () => {
  const { data: session } = useSession();
  const { data } = useUser(session?.user?.id as string);

  return (
    <>
      <Seo title={TITLE} />
      <Header col1={<TitleCol>{TITLE}</TitleCol>} />
      <Form user={data?.user} />
    </>
  );
};
export default Edit;
