import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-darkBlue min-h-screen pb-14">
      <Component {...pageProps} />{" "}
    </div>
  );
}

export default MyApp;
