const bookAuthor = ({ author }: { author: string | null }) => {
  return <>{author && <span> • {author}</span>}</>;
};
export default bookAuthor;
