import ResponsiveImage from "@/components/core/responsive-image";
import Profile from "@/components/icon/profile";
import Thumbnail from "@/components/login/thumbnail";
import {
  CF_DOMAIN,
  LOGIN_DELAY_INTERVAL,
  LOGIN_INITIAL_DELAY,
  PRIMARY_GREEN,
} from "@/constants";
import { signIn, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function Login() {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex flex-col h-full min-h-screen p-8 bg-soft-white">
        {session ? (
          <>
            <div>{session?.user?.name}님, 환영합니다.</div>
          </>
        ) : (
          <>
            <Thumbnail />
            <div className="flex flex-col gap-y-2 mt-auto">
              {/*  <button
              className="px-4 py-2 text-white rounded-md bg-slate-800"
              onClick={() => signIn("kakao", { callbackUrl: "/" })}
            >
              Sign in with Kakao
            </button>*/}
              <motion.button
                animate={{
                  opacity: [0, 1],
                  translateY: [16, 0],
                }}
                transition={{
                  duration: 1,
                  delay: LOGIN_INITIAL_DELAY + 3 * LOGIN_DELAY_INTERVAL,
                }}
                className="w-full px-4 py-2 font-semibold border-2 border-primary-green rounded-md flex items-center justify-center gap-2"
                onClick={() => signIn("credentials", { callbackUrl: "/" })}
              >
                <Profile width={1.2} color={PRIMARY_GREEN} strokeWidth={3.5} />
                게스트로 입장하기
              </motion.button>
              <motion.button
                animate={{
                  opacity: [0, 1],
                  translateY: [16, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 2 * LOGIN_INITIAL_DELAY + 3 * LOGIN_DELAY_INTERVAL,
                }}
                className="w-full px-4 py-2 font-semibold border-2 border-primary-green rounded-md flex items-center justify-center gap-2"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <div className="w-4">
                  <ResponsiveImage
                    src={`${CF_DOMAIN}icon/google.png`}
                    alt="google"
                    aspectRatio="1"
                  />
                </div>
                구글 계정으로 시작하기
              </motion.button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
