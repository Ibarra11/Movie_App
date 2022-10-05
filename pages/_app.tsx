import "../styles/globals.css";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { server } from "../lib/server";
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

function MyApp({ Component, pageProps }: CustomAppProps) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    setIsMounted(true);
  }, []);
  async function checkLoginStatus() {
    const res = await fetch(`${server}/api/auth/user`);
    const data = await res.json();
    if (data.isLoggedIn === false) {
      router.push("/account/login");
    }
  }

  if (Component.protected && isMounted) {
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
