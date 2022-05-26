import { Movie } from "@prisma/client";
import { HTMLInputTypeAttribute } from "react";
export type TrendingMovie = {
  [K in keyof Movie]: Movie[K] extends infer R
    ? R extends null
      ? never
      : R
    : never;
};

export type HandleChange = (val: string) => void;

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface SignupFormInputs extends LoginFormInputs {
  repeatPassword: string;
}

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
