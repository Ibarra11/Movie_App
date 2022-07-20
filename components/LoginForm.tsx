import Link from "next/link";
import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../types/apollo-generated";

interface Inputs {
  email: string;
  password: string;
  submit: string;
}

const errorMessage: (arg: string) => React.ReactNode = (message) => {
  return (
    <span role="alert" className="absolute text-red text-xs right-0 bottom-0">
      {message}
    </span>
  );
};

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<Inputs>();

  const [loginMutation, { loading }] = useLoginMutation();

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    loginMutation({
      variables: { email, password },
      onError: async () => {
        setError("submit", { type: "submit" });
        resetField("email");
        resetField("password");
      },
      onCompleted: async (data) => {
        if (data.login) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ user: data.login.id }),
            }
          );
          if (response.ok) {
            router.push("/");
          }
        } else {
          // no user was found

          setError("submit", { type: "submit" });
          resetField("email");
          resetField("password");
        }
      },
    });
  };
  // if we had submitted the form, but it was unsuccessful and they either enter into
  // the email address field or password, we just reset the error state.
  if (isDirty && errors.submit) {
    const { email, password } = getValues();
    if (email || password) {
      clearErrors("submit");
    }
  }

  return (
    <form
      className={`bg-semiDarkBlue w-full flex flex-col gap-10 rounded-xl p-6 pb-8 md:w-96 md:p-8`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="relative">
        <h3 className=" text-4xl text-white text ">Login</h3>
        {errors.submit?.type === "submit" && (
          <span
            role="alert"
            className="absolute translate-y-3 text-xs text-red"
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
      </div>
      <div className="flex flex-col gap-6 ">
        <button
          type="submit"
          className=" bg-red py-4 rounded-md text-center text-white"
        >
          {loading ? "loading" : "Login to your account"}
        </button>
        <div className="flex gap-2 justify-center">
          <p className="text-white text-base">Don&#39;t have an account?</p>
          <Link href="/account/signup">
            <a className="text-red text-base">Sign Up</a>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
