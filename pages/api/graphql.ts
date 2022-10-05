import { ApolloServer } from "apollo-server-micro";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { resolvers } from "../../graphql/resolvers";
import { createContext } from "../../graphql/context";
import Cors from "micro-cors";

const cors = Cors();
const typeDefs = loadSchemaSync("./graphql/schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

const startServer = apolloServer.start();

export default withIronSessionApiRoute(
  cors(async (req, res) => {
    if (req.method === "OPTIONS") {
      res.end();
      return false;
    }
    await startServer;

    await apolloServer.createHandler({
      path: "/api/graphql",
    })(req, res);
  }),
  sessionOptions
);

export const config = {
  api: {
    bodyParser: false,
  },
};
