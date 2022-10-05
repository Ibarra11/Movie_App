import { ApolloServer, gql } from "apollo-server-micro";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { resolvers } from "../../graphql/resolvers";
import { createContext } from "../../graphql/context";
import Cors from "micro-cors";
const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    bookmarks: [Movie!]!
  }

  type Movie {
    id: Int!
    title: String!
    year: Int!
    category: String!
    rating: String!
    isTrending: Boolean!
    trending_sm: String
    trending_lg: String
    regular_sm: String!
    regular_md: String!
    regular_lg: String!
  }

  type Query {
    getBookmarkedMovies: [Movie!]!
    getAllMovies: [Movie!]!
  }

  type Mutation {
    signup(email: String!, password: String!): User!
    login(email: String!, password: String!): User
    addBookmark(movieId: Int!): Movie!
    removeBookmark(movieId: Int!): Movie!
  }
`;
const cors = Cors();
// const typeDefs = loadSchemaSync(`../../public/graphql/schema.graphql`, {
//   loaders: [new GraphQLFileLoader()],
// });
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

const startServer = apolloServer.start();

export default withIronSessionApiRoute(
  cors(async (req, res) => {
    console.log(req);
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
