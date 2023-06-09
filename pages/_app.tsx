import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthChecker>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </AuthChecker>
    </SessionProvider>
  );
}

// 로그인하지 않은 사용자는 로그인 페이지로 이동
const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return <>{children}</>;
};
