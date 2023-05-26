const BookInfo = ({ type }: { type: 1 | 2 | 3 }) => {
  return (
    <div className="flex gap-2 py-2 text-xs">
      <div>
        {type === 1 && "읽고 있는 책"}
        {type === 2 && "함께 읽는 책"}
        {type === 3 && "아카이브"}
      </div>
      <div className="w-10 h-10 bg-slate-200">사진</div>
      <div className="flex flex-col items-center h-10">
        <div className="">책제목</div>
        <div className="px-1 my-auto rounded-full bg-slate-400">+9</div>
      </div>
    </div>
  );
};

export default BookInfo;
