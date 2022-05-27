import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (pageProps.protected) {
    fetch("/api/auth/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn === false) {
          router.push("/account/login");
        } else {
          <div className="bg-darkBlue min-h-screen pb-14">
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </div>;
        }
      });
  } else {
    return (
      <div className="bg-darkBlue min-h-screen pb-14">
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </div>
    );
  }
}

export default MyApp;
