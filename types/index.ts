import { Movie } from "@prisma/client";
import { NextPage } from "next";
import { HTMLInputTypeAttribute } from "react";

export type TrendingMovie = {
  [K in keyof Movie]: Movie[K] extends infer R
    ? R extends null
      ? never
      : R
    : never;
} & { isBookmarked: boolean };

export type HandleChange = (val: string) => void;

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface SignupFormInputs extends LoginFormInputs {
  repeatPassword: string;
}

export type ProtectedPage<T extends { [key: string]: any }> = NextPage<T> & {
  protected: boolean;
};

export type FormState = LoadingFormState | ErrorFormState;

interface LoadingFormState {
  state: "loading";
  loading: boolean;
}
export interface ErrorFormState {
  state: "error";
  error: boolean;
  message: string;
}

export function isTrendingMovie(movie: Movie): movie is TrendingMovie {
  return movie.isTrending;
}

export type MovieType = Movie & { isBookmarked: boolean };

export type BookmarkedMovieIds = { [key: string]: boolean };
