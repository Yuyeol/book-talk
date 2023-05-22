import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";
import { store } from "@/app/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <SWRConfig
          value={{
            fetcher: (url) => fetch(url).then((res) => res.json()),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </Provider>
    </SessionProvider>
  );
}
