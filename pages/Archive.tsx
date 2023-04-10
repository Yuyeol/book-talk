import ArchiveItem from "@/components/archive/archive-item";
import Layout from "@/components/layout";

const Archive = () => {
  return (
    <Layout>
      <ul className="grid grid-cols-2 gap-4 px-4 pt-4 ">
        <ArchiveItem />
        <ArchiveItem />
        <ArchiveItem />
        <ArchiveItem />
      </ul>
    </Layout>
  );
};
export default Archive;
