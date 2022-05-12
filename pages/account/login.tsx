import { useState } from "react";
import Image from "next/image";
import { HandleChange } from "../../types";
import Form from "../../components/Form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange: HandleChange = (e) => setEmail(e);
  const handlePasswordChange: HandleChange = (val) => setPassword(val);

  return (
    <div className=" flex flex-col gap-14 items-center  py-12 px-6">
      <Image
        src="/icons/logo.svg"
        width={32}
        height={25}
        layout="fixed"
        alt="logo"
      />
      <Form
        formType={{
          kind: "login",
          emailValue: email,
          passwordValue: password,
          onEmailChange: handleEmailChange,
          onPasswordChange: handlePasswordChange,
        }}
      />
    </div>
  );
};

export default Login;
