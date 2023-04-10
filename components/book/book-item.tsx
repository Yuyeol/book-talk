const BookItem = () => {
  return (
    <li className="flex items-center py-2">
      <div className="w-12 h-12 mr-2 rounded-md bg-slate-600">사진</div>
      <div className="flex-1">
        <div className="">책 제목</div>
        <div className="text-sm">설명</div>
      </div>
      <div className="w-[70px]">
        <div className="mx-auto mb-1 text-xs text-center">2022.02.21</div>
        <div className="flex items-center justify-center w-5 h-5 mx-auto text-xs text-center text-white rounded-full bg-slate-600">
          1
        </div>
      </div>
    </li>
  );
};
export default BookItem;
