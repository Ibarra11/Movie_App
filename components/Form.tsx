import Link from "next/link";
import { HandleChange } from "../types";
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
const Form = ({ formType }: { formType: Form }) => {
  const { kind, emailValue, onEmailChange, passwordValue, onPasswordChange } =
    formType;
  return (
    <form className="bg-semiDarkBlue w-full flex flex-col gap-10 rounded-xl p-6 pb-8">
      <h3 className=" text-4xl text-white text ">
        {kind === "signup" ? "Sign Up" : "Login"}
      </h3>
      <div className="flex flex-col gap-6">
        <div className="relative flex flex-col gap-3">
          <label className=" text-sm text-slate-400" htmlFor="email">
            Email Address
          </label>
          <input
            className="appearance-none bg-transparent h-full text-slate-300 pb-0.5  border-b border-b-greyishBlue focus:outline-none  "
            type="email"
            id="email"
            onChange={(e) => onEmailChange(e.target.value)}
            value={emailValue}
          />
        </div>
        <div className="relative flex flex-col gap-3">
          <label className="text-sm text-slate-400" htmlFor="email">
            Password
          </label>
          <input
            className="appearance-none bg-transparent h-full text-slate-300 pb-0.5  border-b border-b-greyishBlue focus:outline-none  "
            type="password"
            id="password"
            onChange={(e) => onPasswordChange(e.target.value)}
            value={passwordValue}
          />
        </div>
        {kind === "signup" ? (
          <div className="relative flex flex-col gap-3">
            <label className="text-sm text-slate-400" htmlFor="repeat-password">
              Repeat Password
            </label>
            <input
              className="appearance-none bg-transparent h-full text-slate-300 pb-0.5  border-b border-b-greyishBlue focus:outline-none  "
              type="password"
              id="repeat-password"
              onChange={(e) => formType.onRepeatPasswordChange(e.target.value)}
              value={formType.repeatPasswordValue}
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-6 ">
        <button
          type="submit"
          className=" bg-red py-4 rounded-md text-center text-white"
        >
          {kind === "signup" ? "Create an account" : "Login to your account"}
        </button>
        <div className="flex gap-2 justify-center">
          <p className="text-white text-base">
            {kind === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <Link href="/signup">
            <a className="text-red text-base">
              {kind === "signup" ? "Login" : "Sign Up"}
            </a>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Form;
