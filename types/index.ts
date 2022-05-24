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

export interface FieldType {
  type: HTMLInputTypeAttribute;
  initialValue: string;
}
export interface FormType<IFields extends string> {
  type: "login" | "signup";
  fields: { [K in IFields]: FieldType };
  validations?: {
    [K in keyof this["fields"]]?: {
      required?: {
        message: string;
      };
      minLength?: {
        value: number;
        message: string;
      };
      maxLength?: {
        value: number;
        message: string;
      };
    };
  };
  onSubmit: (...args: unknown[]) => void;
}
