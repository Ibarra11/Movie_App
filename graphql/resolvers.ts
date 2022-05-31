import bcrypt from "bcrypt";
import { Resolvers } from "./generated-types";
import { User } from "./generated-types";
export const resolvers: Resolvers = {
  Query: {
    getBookmarkedMovies: (_parent, { userId }, { prisma }) => {
      return prisma.movie.findMany();
    },
    getAllMovies: (_parent, _args, { prisma }) => {
      return prisma.movie.findMany();
    },
  },
  Mutation: {
    signup: async (_parent, { email, password }, { prisma }) => {
      const saltRounds = 10;
      // let user: User;

      try {
        const hash = await bcrypt.hash(password, saltRounds);

        const user = await prisma.user.create({
          data: {
            email,
            password: hash,
          },
          include: {
            bookmarks: true,
          },
        });

        return user;
      } catch (e: unknown) {
        if (e instanceof Error) {
          if (e.message.includes("Unique constraint")) {
            throw new Error(`Sorry, an account with ${email} already exist.`);
          }
        }
        throw new Error("failed signup");
      }
    },
    login: async (_parent, { email, password }, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          bookmarks: true,
        },
      });

      // if there is no user will just return null
      if (!user) {
        return null;
      }

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        return user;
      }
      // the passwords dont match
      return null;
    },
  },
};
