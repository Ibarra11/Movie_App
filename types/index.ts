import { Movie } from "@prisma/client";

export type TrendingMovie = {
  [K in keyof Movie]: Movie[K] extends infer R
    ? R extends null
      ? never
      : R
    : never;
};

export type HandleChange = (val: string) => void;
