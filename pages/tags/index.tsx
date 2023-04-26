import Layout from "@/components/layout";
import Item from "@/components/tags/item";
import List from "@/components/tags/list";
import useSWR from "swr";
import { Tag } from "@prisma/client";
import Link from "next/link";
import Plus from "@/components/icon/plus";
import { HEADER_ICON_COLOR, HEADER_ICON_WIDTH } from "@/constants";
import Search from "@/components/icon/search";
import Filter from "@/components/icon/filter";
import { HeaderIconPortal } from "@/lib/client/portal";
import IconWrapper from "@/components/header/icon-col";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";
import IconCol from "@/components/header/icon-col";

const Tags = () => {
  const { data } = useSWR("/api/tags");

  return (
    <Layout>
      <Header
        col1={<TitleCol>Book</TitleCol>}
        col2={
          <IconCol>
            <Link href="/tags/create">
              <Plus width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
            <Link href="/tags/search">
              <Search width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </Link>
            <button>
              <Filter width={HEADER_ICON_WIDTH} color={HEADER_ICON_COLOR} />
            </button>
          </IconCol>
        }
      />
      <div className="p-4">
        <List title="책 태그" description="장르, 특징, 목적 등">
          {data?.tags.map((tag: Tag) => (
            <Item key={tag.id} tag={tag} />
          ))}
        </List>
      </div>
    </Layout>
  );
};
export default Tags;
