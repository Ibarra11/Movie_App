import { useMutation } from "@apollo/client";
import Image from "next/image";
import SignupForm from "../../components/SignupForm";
import { SIGNUP } from "../../graphql/mutations";
import { SignupFormInputs } from "../../types";

const Signup = () => {
  const [signup, { data, loading, error }] = useMutation(SIGNUP);
  function handleSignup(formData: SignupFormInputs) {
    console.log(formData);
  }
  return (
    <div className=" flex flex-col gap-14 items-center  py-12 px-6">
      <Image
        src="/icons/logo.svg"
        width={32}
        height={25}
        layout="fixed"
        alt="logo"
      />

      <SignupForm onSignup={handleSignup} />
    </div>
  );
};

export default Signup;
