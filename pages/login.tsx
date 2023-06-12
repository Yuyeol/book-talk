import Layout from "@/components/layout";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex flex-col h-full min-h-screen p-8 bg-slate-400">
        {session ? (
          <>
            <div>{session?.user?.name}님, 환영합니다.</div>
          </>
        ) : (
          <>
            <button
              className="px-4 py-2 text-white rounded-md bg-slate-800"
              onClick={() => signIn("kakao", { callbackUrl: "/" })}
            >
              Sign in with Kakao
            </button>
            <button
              className="px-4 py-2 text-white rounded-md bg-slate-800"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
