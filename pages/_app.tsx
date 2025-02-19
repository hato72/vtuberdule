import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GroupProvider } from "../components/atoms/groupContext";
import { AuthProvider } from "../components/atoms/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GroupProvider>
        <Component {...pageProps} />
      </GroupProvider>
    </AuthProvider>
  );
}
