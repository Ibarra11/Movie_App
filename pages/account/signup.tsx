import { useState } from "react";
import Image from "next/image";
import { HandleChange } from "../../types";
import Form from "../../components/Form";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const handleEmailChange: HandleChange = (val) => setEmail(val);
  const handlePasswordChange: HandleChange = (val) => setPassword(val);
  const handleRepeatPasswordChange: HandleChange = (val) =>
    setRepeatPassword(val);

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
          kind: "signup",
          emailValue: email,
          passwordValue: password,
          onEmailChange: handleEmailChange,
          onPasswordChange: handlePasswordChange,
          repeatPasswordValue: repeatPassword,
          onRepeatPasswordChange: handleRepeatPasswordChange,
        }}
      />
    </div>
  );
};

export default Signup;
