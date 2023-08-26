import { NextSeo } from "next-seo";

const Seo = ({ title }: { title: string }) => {
  return <NextSeo title={`공책 | ${title}`} />;
};
export default Seo;
