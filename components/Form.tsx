import Link from "next/link";
import React, { useState } from "react";
import { FormType } from "../types";
import { FormEvent } from "react";
import { HandleChange } from "../types";
import { FieldType } from "../types/index";
interface FormFields {
  emailValue: string;
  onEmailChange: HandleChange;
  passwordValue: string;
  onPasswordChange: HandleChange;
}
type Login = {
  kind: "login";
} & FormFields;
type Signup = {
  kind: "signup";
  repeatPasswordValue: string;
  onRepeatPasswordChange: HandleChange;
} & FormFields;

type Form = Login | Signup;

const Form: <K extends string>(props: FormType<K>) => React.ReactElement = ({
  type,
  fields,
  validations,
  onSubmit,
}) => {
  function inputElement(fieldName: string, fieldType: FieldType["type"]) {
    return (
      <div key={fieldName} className="relative flex flex-col gap-3">
        <label
          className="text-sm capitalize text-slate-400"
          htmlFor={fieldName}
        >
          {fieldName}
        </label>
        <input
          className="appearance-none bg-transparent h-full text-slate-300 pb-0.5  border-b border-b-greyishBlue focus:outline-none  "
          type={fieldType}
          id={fieldName}
        />
      </div>
    );
  }

  function createInputs() {
    const inputs = [];
    for (const input in fields) {
      inputs.push(inputElement(input, fields[input].type));
    }
    return inputs;
  }

  return (
    <form
      className="bg-semiDarkBlue w-full flex flex-col gap-10 rounded-xl p-6 pb-8"
      onSubmit={() => console.log("what")}
    >
      <h3 className=" text-4xl text-white text ">
        {type === "signup" ? "Sign Up" : "Login"}
      </h3>
      <div className="flex flex-col gap-6">{createInputs()}</div>
      <div className="flex flex-col gap-6 ">
        <button
          type="submit"
          className=" bg-red py-4 rounded-md text-center text-white"
        >
          {type === "signup" ? "Create an account" : "Login to your account"}
        </button>
        <div className="flex gap-2 justify-center">
          <p className="text-white text-base">
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <Link href={type === "signup" ? "/account/login" : "/account/signup"}>
            <a className="text-red text-base">
              {type === "signup" ? "Login" : "Sign Up"}
            </a>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Form;
