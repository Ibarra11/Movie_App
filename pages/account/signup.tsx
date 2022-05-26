import Image from "next/image";
import { useState } from "react";
import { useSignupMutation } from "../../types/apollo-generated";
import { ErrorFormState, FormState } from "../../types";
import SignupForm from "../../components/SignupForm";
import { SignupFormInputs } from "../../types";

const Signup = () => {
  const [errorState, setFormState] = useState<ErrorFormState>({
    state: "error",
    error: false,
    message: "",
  });
  const [signup, { data, loading, error }] = useSignupMutation();

  const formState: FormState = errorState.error
    ? errorState
    : { state: "loading", loading };

  function handleSignup(formData: SignupFormInputs) {
    const { email, password } = formData;
    setFormState({
      state: "error",
      error: false,
      message: "",
    });
    signup({
      variables: { email, password },
      onError: (error) => {
        setFormState({
          ...errorState,
          error: true,
          message: error.message,
        });
      },
    });
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

      <SignupForm formState={formState} onSignup={handleSignup} />
    </div>
  );
};

export default Signup;
