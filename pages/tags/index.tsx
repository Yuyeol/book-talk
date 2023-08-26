import Item from "@/components/tags/item";
import { Tag } from "@prisma/client";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import { useSession } from "next-auth/react";
import useTags from "@/lib/client/useSwr/useTags";
import Form from "@/components/tags/form";
import { useState } from "react";
import SpinnerWrapper from "@/components/icon/spinner-wrapper";
import Spinner from "@/components/icon/spinner";
import Seo from "@/components/Seo";

const TITLE = "태그";

const Tags = () => {
  const { data: session } = useSession();
  const { data } = useTags(session?.user?.id);
  const [selectedTag, setSelectedTag] = useState<Tag | undefined>();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  return (
    <>
      <Seo title={TITLE} />
      <Header col1={<TitleCol>{TITLE}</TitleCol>} />
      <div className="px-4">
        <div className="py-2 text-xl font-bold">태그 목록</div>
        {data ? (
          <ul className="px-2 flex flex-wrap gap-2">
            {data.tags.map((tag: Tag) => (
              <Item
                key={tag.id}
                tag={tag}
                setSelectedTag={setSelectedTag}
                setIsFormOpen={setIsFormOpen}
              />
            ))}
          </ul>
        ) : (
          <SpinnerWrapper type="block-center" blockHeight={4}>
            <Spinner width={2} />
          </SpinnerWrapper>
        )}
        <Form
          tag={selectedTag}
          setSelectedTag={setSelectedTag}
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
        />
      </div>
    </>
  );
};
export default Tags;
