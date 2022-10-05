import { ApolloClient, InMemoryCache } from "@apollo/client";
import { server } from "./server";
const apolloClient = new ApolloClient({
  uri: `${server}/api/graphql`,
  cache: new InMemoryCache(),
});

export { apolloClient };
