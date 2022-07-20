import { render as rtlRender } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../apollo";
import { ReactNode } from "react";
// interface render {
//   ui: ReactNode;
// }

function render(ui: ReactNode) {
  return <ApolloProvider client={apolloClient}>{ui}</ApolloProvider>;
}

export * from "@testing-library/react";
// overwriting the render from testing-library/react
export { render };
