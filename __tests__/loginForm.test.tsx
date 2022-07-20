import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import "whatwg-fetch";
import LoginForm from "../components/LoginForm";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
// import { apolloClient } from "../lib/apollo";

// test("ommiting password results in a error message", async () => {
//   render(
//     <MockedProvider>
//       <LoginForm />
//     </MockedProvider>
//   );
//   const email = screen.getByLabelText(/email/i);
//   const submitBtn = screen.getByRole("button", { name: /login/i });

//   await userEvent.type(email, "test@gmail.com");
//   await userEvent.click(submitBtn);
//   const alert = screen.getByRole("alert");
//   expect(alert.textContent).toBe("This field is required");
// });

// test("ommiting an email results in a error message", async () => {
//   render(
//     <MockedProvider>
//       <LoginForm />
//     </MockedProvider>
//   );
//   const password = screen.getByLabelText(/password/i);
//   const submitBtn = screen.getByRole("button", { name: /login/i });
//   await userEvent.type(password, "test12345");
//   await userEvent.click(submitBtn);
//   const alert = screen.getByRole("alert");
//   expect(alert.textContent).toBe("This field is required");
// });

// test("invalid email input results in a error message", async () => {
//   render(
//     <MockedProvider>
//       <LoginForm />
//     </MockedProvider>
//   );
//   const email = screen.getByLabelText(/email/i);
//   const password = screen.getByLabelText(/password/i);
//   const submitBtn = screen.getByRole("button", { name: /login/i });
//   await userEvent.type(email, "invalidEmail");
//   await userEvent.type(password, "test12345");
//   await userEvent.click(submitBtn);
//   const alert = screen.getByRole("alert");
//   expect(alert.textContent).toBe("Please enter a valid email address");
// });

// test("invalid password length results in error message", async () => {
//   render(
//     <MockedProvider>
//       <LoginForm />
//     </MockedProvider>
//   );
//   const email = screen.getByLabelText(/email/i);
//   const password = screen.getByLabelText(/password/i);
//   const submitBtn = screen.getByRole("button", { name: /login/i });
//   await userEvent.type(email, "test@gmail.com");
//   await userEvent.type(password, "test");
//   await userEvent.click(submitBtn);
//   const alert = screen.getByRole("alert");
//   expect(alert).toHaveTextContent("Password must be atleast 6 characters");
// });

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

// test("when user submits credentials, the button should show a loading indicator", async () => {
//   render(
//     <ApolloProvider client={client}>
//       <LoginForm />
//     </ApolloProvider>
//   );
//   const email = screen.getByLabelText(/email/i);
//   const password = screen.getByLabelText(/password/i);
//   const submitBtn = screen.getByRole("button", { name: /login/i });
//   await userEvent.type(email, "test@gmail.com");
//   await userEvent.type(password, "test123");
//   await userEvent.click(submitBtn);
//   expect(screen.getByRole("button", { name: /loading/i })).toBeInTheDocument();
// });

test("when user sumbits credentials that are not in db displays error message", async () => {
  render(
    <ApolloProvider client={client}>
      <LoginForm />
    </ApolloProvider>
  );
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole("button", { name: /login/i });
  await userEvent.type(email, "test@gmail.com");
  await userEvent.type(password, "unknown");
  await userEvent.click(submitBtn);

  // Originally, use waitForElementToBeRemoved for the loading status on the button, but did not work.  I suspect
  // that the reason is because the element itself was never removed the dom only the text changed from loading to submit.
  // This test will fail if there is no role found
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/no user found with this email/i);
});
