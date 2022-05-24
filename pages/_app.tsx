import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-darkBlue min-h-screen pb-14">
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />{" "}
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
