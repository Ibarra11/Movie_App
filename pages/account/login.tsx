import Image from "next/image";
import { HandleChange } from "../../types";
import Form from "../../components/Form";

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
      {Form<"email" | "password">({
        type: "login",
        fields: {
          email: {
            type: "email",
            initialValue: "",
          },
          password: {
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
        },
        onSubmit: () => console.log("what"),
      })}
    </div>
  );
};

export default Login;
