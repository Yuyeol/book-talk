import useMutation from "@/lib/client/useMutation";
import { useEffect, useState } from "react";
import Dots from "@/components/icon/dots";
import { SOFT_WHITE, YELLOW_1 } from "@/constants";
import { useSession } from "next-auth/react";
import useUser from "@/lib/client/useSwr/useUser";

interface IProps {
  friendId: string;
  setIsModalOpen: (value: boolean) => void;
}

const More = ({ friendId, setIsModalOpen }: IProps) => {
  const [isMoreOpened, setIsMoreOpened] = useState(false);

  const toggleButtons = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMoreOpened(!isMoreOpened);
  };
  const { data: session } = useSession();
  const { mutate } = useUser(session?.user?.id as string);
  const { mutation, data, loading } = useMutation(
    `/api/users/${session?.user?.id}/friends/delete`
  );
  const removeFriend = () => {
    if (loading) return;
    mutation({ friendId }, "POST");
  };
  useEffect(() => {
    if (data) {
      mutate();
      setIsModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="relative">
      <div className="space-x-1 flex items-center absolute right-0 p-2">
        <div className="overflow-hidden px-2 translate-x-2">
          <div
            className={`transition-all duration-300 ease-out space-x-1 mb-1 ${
              isMoreOpened
                ? "translate-x-0 opacity-100"
                : "translate-x-2 opacity-0"
            }`}
          >
            <button
              className="c_button_block_xs bg-yellow-1 text-soft-black"
              onClick={removeFriend}
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
            <Dots width={1.25} color={isMoreOpened ? YELLOW_1 : SOFT_WHITE} />
          </div>
        </button>
      </div>
    </div>
  );
};
export default More;
