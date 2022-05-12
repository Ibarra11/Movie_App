import { Resolvers } from "./generated-types";
export const resolvers: Resolvers = {
  Query: {
    getBookmarkedMovies: (_parent, { userId }, { prisma }) => {
      return prisma.movie.findMany();
    },
    getAllMovies: (_parent, _args, { prisma }) => {
      return prisma.movie.findMany();
    },
  },
};
