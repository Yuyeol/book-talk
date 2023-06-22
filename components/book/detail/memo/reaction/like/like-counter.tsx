interface IProps {
  likeLength: number | undefined;
}

const Like = ({ likeLength }: IProps) => {
  return (
    <>
      {likeLength !== 0 && (
        <div className="text-sm text-primary-green">좋아요 {likeLength}개</div>
      )}
    </>
  );
};
export default Like;
