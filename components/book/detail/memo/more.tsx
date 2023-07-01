import useMutation from "@/lib/client/useMutation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Dots from "@/components/icon/dots";
import { PRIMARY_GREEN, SOFT_BLACK } from "@/constants";
import useMemos from "@/lib/client/useSwr/useMemos";

interface IProps {
  memoId: number;
  bookId: number;
  setSelectedMemoId: (id: number) => void;
}

const More = ({ memoId, setSelectedMemoId }: IProps) => {
  const router = useRouter();
  const [isMoreOpened, setIsMoreOpened] = useState(false);

  const toggleButtons = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMoreOpened(!isMoreOpened);
  };
  const {
    mutation,
    loading,
    data: memoResData,
  } = useMutation(`/api/memos/${memoId}`);
  const { data: memosData, mutate } = useMemos(
    parseInt(router.query.bookId as string)
  );

  const onDeleteMemo = (id: number) => {
    if (loading) return;
    mutation({ id: id }, "DELETE");
  };

  useEffect(() => {
    if (memoResData && memosData?.ok) {
      mutate({
        ok: true,
        memos: memosData.memos.filter((m) => m.id !== memoId),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoResData]);

  return (
    <div className="space-x-1 flex items-center">
      <div className="overflow-hidden px-2 translate-x-2">
        <div
          className={`transition-all duration-300 ease-out space-x-1 ${
            isMoreOpened
              ? "translate-x-0 opacity-100"
              : "translate-x-2 opacity-0"
          }`}
        >
          <button
            className="c_button_block_xs"
            onClick={() => {
              setIsMoreOpened(false);
              setSelectedMemoId(memoId);
            }}
          >
            수정
          </button>
          <button
            className="c_button_block_xs"
            onClick={() => {
              onDeleteMemo(memoId);
              setIsMoreOpened(false);
            }}
          >
            삭제
          </button>
        </div>
      </div>
      <button
        className={`inline-block transition-transform duration-300 ease-out ${
          isMoreOpened ? "rotate-0" : "rotate-90"
        }`}
        onClick={(e) => toggleButtons(e)}
      >
        <div>
          <Dots
            width={1.25}
            color={isMoreOpened ? PRIMARY_GREEN : SOFT_BLACK}
          />
        </div>
      </button>
    </div>
  );
};
export default More;
