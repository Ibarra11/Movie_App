import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSignupMutation } from "../../types/apollo-generated";
import { ErrorFormState, FormState } from "../../types";
import SignupForm from "../../components/SignupForm";
import { SignupFormInputs } from "../../types";

const Signup = () => {
  const router = useRouter();
  const [errorState, setFormState] = useState<ErrorFormState>({
    state: "error",
    error: false,
    message: "",
  });
  const [signup, { loading }] = useSignupMutation();

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
      async onCompleted(data) {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: data.signup.id }),
        });

        if (response.ok) {
          router.push("/");
        }
      },
    });
  }

  return (
    <div className=" bg-darkBlue h-screen flex flex-col gap-14 items-center  py-12 px-6 md:gap-16">
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
