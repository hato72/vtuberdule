import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GroupProvider } from "@/components/atoms/groupContext";

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return (
    <GroupProvider>
      <Component {...pageProps} />
    </GroupProvider>
  )
}
