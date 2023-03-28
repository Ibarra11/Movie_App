import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApolloProvider } from "@apollo/client";
import "whatwg-fetch";
import { apolloClient } from "../lib/apollo";
import LoginForm from "../components/LoginForm";

function setup() {
  render(
    <ApolloProvider client={apolloClient}>
      <LoginForm />
    </ApolloProvider>
  );
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole("button", { name: /login/i });
  return { emailInput, passwordInput, submitBtn };
}

test("ommiting password results in a error message", async () => {
  const { emailInput, submitBtn } = setup();
  await userEvent.type(emailInput, "test@gmail.com");
  await userEvent.click(submitBtn);
  const alert = screen.getByRole("alert");
  expect(alert.textContent).toBe("This field is required");
});

test("ommiting an email results in a error message", async () => {
  const { passwordInput, submitBtn } = setup();
  await userEvent.type(passwordInput, "test12345");
  await userEvent.click(submitBtn);
  const alert = screen.getByRole("alert");
  expect(alert.textContent).toBe("This field is required");
});

test("invalid email input results in a error message", async () => {
  const { emailInput, passwordInput, submitBtn } = setup();
  await userEvent.type(emailInput, "invalidEmail");
  await userEvent.type(passwordInput, "test12345");
  await userEvent.click(submitBtn);
  const alert = screen.getByRole("alert");
  expect(alert.textContent).toBe("Please enter a valid email address");
});

test("invalid password length results in error message", async () => {
  const { emailInput, passwordInput, submitBtn } = setup();
  await userEvent.type(emailInput, "test@gmail.com");
  await userEvent.type(passwordInput, "test");
  await userEvent.click(submitBtn);
  const alert = screen.getByRole("alert");
  expect(alert).toHaveTextContent("Password must be atleast 6 characters");
});

test("when user sumbits credentials that are not in db displays error message", async () => {
  const { emailInput, passwordInput, submitBtn } = setup();
  await userEvent.type(emailInput, "test@gmail.com");
  await userEvent.type(passwordInput, "unknown");
  await userEvent.click(submitBtn);

  // Originally, use waitForElementToBeRemoved for the loading status on the button, but did not work.  I suspect
  // that the reason is because the element itself was never removed the dom only the text changed from loading to submit.
  // This test will fail if there is no role found
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/no user found with this email/i);
});
