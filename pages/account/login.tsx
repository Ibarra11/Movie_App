import Image from "next/image";

import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <div className=" flex flex-col gap-14 items-center  py-12 px-6">
      <Image
        src="/icons/logo.svg"
        width={32}
        height={25}
        layout="fixed"
        alt="logo"
      />
      <LoginForm />
    </div>
  );
};

export default Login;
