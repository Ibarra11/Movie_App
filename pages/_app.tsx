import "../styles/globals.css";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import apolloClient from "../lib/apollo";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  async function checkLoginStatus() {
    const res = await fetch("/api/auth/user");
    const data = await res.json();
    if (data.isLoggedIn === false) {
      router.push("/account/login");
    }
  }

  if (pageProps.protected) {
    checkLoginStatus();
  }

  return (
    <div className="bg-darkBlue min-h-screen pb-14">
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
