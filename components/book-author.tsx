const BookAuthor = ({ author }: { author: string | null | undefined }) => {
  return <>{author && <span> • {author}</span>}</>;
};
export default BookAuthor;
