import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import LoginForm from "../components/LoginForm";

test("failing to provide a password results in a error alert", async () => {
  render(
    <MockedProvider>
      <LoginForm />
    </MockedProvider>
  );
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole("button", { name: /login/i });

  await userEvent.type(email, "test@gmail.com");
  await userEvent.click(submitBtn);
  const alert = screen.getByRole("alert");
  expect(alert.textContent).toBe("This field is required");
});
