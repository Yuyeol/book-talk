interface IProps {
  likeLength: number | undefined;
}

const Like = ({ likeLength }: IProps) => {
  return (
    <div>
      <span className={`text-sm ${likeLength !== 0 && "text-primary-green"}`}>
        좋아요 {likeLength !== 0 && <span>{likeLength}개</span>}
      </span>
    </div>
  );
};
export default Like;
