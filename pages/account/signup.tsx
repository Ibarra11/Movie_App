import { useState } from "react";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import SignupForm from "../../components/SignupForm";
import { SIGNUP } from "../../graphql/mutations";
import { HandleChange } from "../../types";
import Form from "../../components/Form";

const Signup = () => {
  return (
    <div className=" flex flex-col gap-14 items-center  py-12 px-6">
      <Image
        src="/icons/logo.svg"
        width={32}
        height={25}
        layout="fixed"
        alt="logo"
      />
      <SignupForm />
    </div>
  );
};

export default Signup;
