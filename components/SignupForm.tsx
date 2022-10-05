import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { server } from "../lib/server";
import { ClipLoader } from "react-spinners";
import { useSignupMutation } from "../types/apollo-generated";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
  repeatPassword: string;
  submit: string;
}

const errorMessage: (arg: string) => React.ReactNode = (message) => {
  return (
    <span className="absolute text-red text-xs right-0 bottom-0">
      {message}
    </span>
  );
};

const SignupForm: () => React.ReactElement = () => {
  const {
    register,
    handleSubmit,
    getValues,
    getFieldState,
    resetField,
    setError,
    formState: { errors, isDirty },
  } = useForm<Inputs>();
  const router = useRouter();
  const [signup, { loading }] = useSignupMutation();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const { email, password } = formData;
    signup({
      variables: { email, password },
      onError: (error) => {
        setError("submit", { type: "submit" });
        resetField("email");
        resetField("password");
        resetField("repeatPassword");
      },
      async onCompleted(data) {
        const response = await fetch(`${server}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: data.signup.id }),
        });

        if (response.ok) {
          router.push("/");
        }
      },
    });
  };

  return (
    <form
      className=" bg-semiDarkBlue w-full flex flex-col gap-10 rounded-xl p-6 pb-8 md:w-96 md:p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="relative">
        <h3 className=" text-4xl text-white text ">Sign Up</h3>
        {errors.submit?.type === "submit" && (
          <span
            role="alert"
            className="absolute  text-xs text-red translate-y-3"
          >
            No user found with this email
          </span>
        )}
      </header>

      <div className="flex flex-col gap-6">
        <div className="relative flex flex-col gap-3">
          <label className="relative text-sm text-slate-400" htmlFor="email">
            Email Address
            {errors.email?.type === "required" &&
              errorMessage("This field is required")}
            {errors.email?.type === "pattern" &&
              errorMessage("Please enter a valid email address")}
          </label>
          <input
            className="appearance-none bg-transparent h-full text-slate-300 pb-0.5  border-b border-b-greyishBlue invalid:border-b-red focus:outline-none  "
            id="email"
            type="text"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>
        <div className="relative flex flex-col gap-3">
          <label className="relative text-sm text-slate-400" htmlFor="password">
            Password
            {errors.password?.type === "required" &&
              errorMessage("This field is required")}
            {errors.password?.type === "minLength" &&
              errorMessage("Password must be atleast 6 characters")}
            {errors.password?.type === "maxLength" &&
              errorMessage("Password must be less than 30 characters")}
          </label>
          <input
            className="appearance-none bg-transparent h-full text-slate-300 pb-0.5  border-b border-b-greyishBlue focus:outline-none  "
            type="password"
            id="password"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 30,
            })}
          />
        </div>
        <div className="relative flex flex-col gap-3">
          <label
            className="relative text-sm text-slate-400"
            htmlFor="repeatPassword"
          >
            Repeat Password
            {errors.repeatPassword?.type === "required" &&
              errorMessage("This field is required")}
            {errors.repeatPassword?.type === "matchesPassword" &&
              errorMessage("Passwords don't match")}
          </label>
          <input
            className="appearance-none bg-transparent h-full text-slate-300 pb-0.5  border-b border-b-greyishBlue focus:outline-none  "
            type="password"
            id="repeatPassword"
            {...register("repeatPassword", {
              required: true,
              validate: {
                matchesPassword: (e) => {
                  const passwordState = getFieldState("password");
                  const passwordValue = getValues("password");
                  // Inital check for password
                  if (e !== passwordValue) {
                    return false;
                  }

                  return true;
                },
              },
            })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 ">
        <button
          type="submit"
          className=" bg-red py-4 rounded-md text-center text-white"
        >
          {loading ? <ClipLoader size={16} color="white" /> : "Sign Up"}
        </button>
        <div className="flex gap-2 justify-center">
          <p className="text-white text-base">Already have an account?</p>
          <Link href="/account/login">
            <a className="text-red text-base">Login</a>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
