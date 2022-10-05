import "../styles/globals.css";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { apolloClient } from "../lib/apollo";
import Layout from "../components/Layout";
import { NextPage } from "next";

type CustomNextPage = NextPage & {
  protected?: boolean;
};

type CustomAppProps = AppProps & {
  Component: CustomNextPage;
};

const server =
  process.env.dev === "production" ? process.env.NEXT_PUBLIC_URL : "";

function MyApp({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  async function checkLoginStatus() {
    const res = await fetch(`/api/auth/user`);
    const data = await res.json();
    if (data.isLoggedIn === false) {
      router.push("/account/login");
    }
  }

  if (Component.protected) {
    checkLoginStatus();
  }

  useEffect(() => {
    if (
      router.pathname === "/" ||
      router.pathname === "/movies" ||
      router.pathname === "/tv_series" ||
      router.pathname === "/bookmarked"
    ) {
      setSearchValue("");
    }
  }, [router.pathname]);

  return (
    <>
      <h1 className="visibility-hidden">Flix</h1>
      <ApolloProvider client={apolloClient}>
        {Component.protected ? (
          <Layout setSearchValue={setSearchValue} searchValue={searchValue}>
            <Component searchValue={searchValue} {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </ApolloProvider>
    </>
  );
}

export default MyApp;
