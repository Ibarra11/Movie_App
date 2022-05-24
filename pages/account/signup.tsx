import { useState } from "react";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { SIGNUP } from "../../graphql/mutations";
import { HandleChange } from "../../types";
import Form from "../../components/Form";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [addUser, { data, loading, error }] = useMutation(SIGNUP);
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
      {Form<"email" | "password" | "repeat password">({
        type: "signup",
        fields: {
          email: {
            type: "email",
            initialValue: "",
          },
          password: {
            type: "password",
            initialValue: "",
          },
          "repeat password": {
            type: "password",
            initialValue: "",
          },
        },
        validations: {
          email: {
            required: {
              message: "Email is a required field",
            },
          },
          password: {
            required: {
              message: "Password is a required field",
            },
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters long",
            },
            maxLength: {
              value: 30,
              message: "Password must be less than 30 characters",
            },
          },
          "repeat password": {
            required: {
              message: "Password is a required field",
            },
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters long",
            },
            maxLength: {
              value: 30,
              message: "Password must be less than 30 characters",
            },
          },
        },
        onSubmit: () => console.log("what"),
      })}
    </div>
  );
};

export default Signup;
