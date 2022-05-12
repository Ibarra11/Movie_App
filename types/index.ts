import type { Movie } from "../prisma/generated/client";

export type TrendingMovie = {
  [K in keyof Movie]: Movie[K] extends infer R
    ? R extends null
      ? never
      : R
    : never;
};
