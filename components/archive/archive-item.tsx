import ResponsiveImage from "../core/responsive-image";

const ArchiveItem = () => {
  return (
    <li>
      <ResponsiveImage
        src="/mock/book2.jpeg"
        alt=""
        aspectRatio="1"
        objectFit="contain"
      />
      <div className="mt-1 text-center">book name</div>
    </li>
  );
};
export default ArchiveItem;
