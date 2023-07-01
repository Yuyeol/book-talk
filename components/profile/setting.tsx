import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const ItemWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="font-semibold py-1">{children}</div>;
};

const Setting = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="px-4 py-2 text-xl font-bold">설정</div>
      <div className="flex flex-col justify-start divide-y-[1px] divide-primary-green/50 px-6">
        <ItemWrapper>
          <Link href="/profile/edit">프로필 편집</Link>
        </ItemWrapper>
        <ItemWrapper>
          {session ? (
            <button
              className="text-start"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              로그아웃
            </button>
          ) : (
            "로그아웃되었습니다."
          )}
        </ItemWrapper>
      </div>
    </>
  );
};
export default Setting;
