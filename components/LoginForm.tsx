import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
interface Inputs {
  email: string;
  password: string;
}

const errorMessage: (arg: string) => React.ReactNode = (message) => {
  return <span className="absolute text-red text-xs right-0">{message}</span>;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      className="bg-semiDarkBlue w-full flex flex-col gap-10 rounded-xl p-6 pb-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className=" text-4xl text-white text ">Login</h3>
      <div className="flex flex-col gap-6">
        <div className="relative flex flex-col gap-3">
          <label className=" text-sm text-slate-400" htmlFor="email">
            Email Address
          </label>
          <input
            className="appearance-none  bg-transparent h-full text-slate-300 pb-0.5  border-b border-b-greyishBlue focus:outline-none  "
            id="email"
            type="text"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email?.type === "required" &&
            errorMessage("This field is required")}
          {errors.email?.type === "pattern" &&
            errorMessage("Please enter a valid email address")}
        </div>
        <div className="relative flex flex-col gap-3">
          <label className="text-sm text-slate-400" htmlFor="email">
            Password
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
          {errors.password?.type === "required" &&
            errorMessage("This field is required")}
          {errors.password?.type === "minLength" &&
            errorMessage("Password must be atleast 6 characters")}
          {errors.password?.type === "maxLength" &&
            errorMessage("Password must be less than 30 characters")}
        </div>
      </div>
      <div className="flex flex-col gap-6 ">
        <button
          type="submit"
          className=" bg-red py-4 rounded-md text-center text-white"
        >
          Login to your account
        </button>
        <div className="flex gap-2 justify-center">
          <p className="text-white text-base">Don&#39;t have an account</p>
          <Link href="/signup">
            <a className="text-red text-base">Login</a>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
