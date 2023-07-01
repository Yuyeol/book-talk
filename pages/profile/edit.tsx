import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import Form from "@/components/profile/edit/form";
import useUser from "@/lib/client/useSwr/useUser";
import { useSession } from "next-auth/react";

const Edit = () => {
  const { data: session } = useSession();
  const { data } = useUser(session?.user?.id as string);

  return (
    <>
      <Header col1={<TitleCol>Edit</TitleCol>} />
      <Form user={data?.user} />
    </>
  );
};
export default Edit;
