interface IProps {
  type: "like" | "comment";
  length: number | undefined;
}

const Counter = ({ type, length }: IProps) => {
  return (
    <>
      {length !== 0 && (
        <>
          {type === "like" ? "좋아요 " : "댓글 "}
          {length}개{" "}
        </>
      )}
    </>
  );
};
export default Counter;
