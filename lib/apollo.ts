import { ApolloClient, InMemoryCache } from "@apollo/client";
import { server } from "./server";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
const apolloClient = new ApolloClient({
  uri: `${server}/api/graphql`,
  cache: new InMemoryCache(),
});

const typeDefs = loadSchemaSync(`../graphql/schema.graphql`, {
  loaders: [new GraphQLFileLoader()],
});

export { apolloClient, typeDefs };
