import { Resolvers } from "./generated-types";
import { hashPassword, matchPassword } from "../lib/encrypt";
export const resolvers: Resolvers = {
  Query: {
    getBookmarkedMovies: async (_parent, _, { prisma, session }) => {
      const userId = session.user && session.user.id;
      if (userId) {
        const data = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            bookmarks: true,
          },
        });

        return data == null ? [] : data.bookmarks;
      } else {
        throw new Error("Not authorized");
      }
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
        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
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

      const match = await matchPassword(password, user.password);

      if (match) {
        return user;
      }
      // the passwords dont match
      return null;
    },
    addBookmark: async (_parent, { movieId }, { prisma, session }) => {
      const userId = session.user && session.user.id;
      if (userId) {
        const data = await prisma.movie.update({
          where: {
            id: movieId,
          },
          data: {
            users: {
              connect: {
                id: userId,
              },
            },
          },
        });
        return data;
      }
      throw new Error("Not  Authorized");
    },
    removeBookmark: (_parent, { movieId }, { prisma, session }) => {
      const userId = session.user && session.user.id;
      if (userId) {
        return prisma.movie.update({
          where: {
            id: movieId,
          },
          data: {
            users: {
              disconnect: {
                id: userId,
              },
            },
          },
        });
      }
      throw new Error("Not Authorzied");
    },
  },
};
