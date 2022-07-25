import { graphql, rest } from "msw";

export const handlers = [
  graphql.mutation("login", (req, res, ctx) => {
    const { email, password } = req.variables;
    // when the test sends a mock request with password value of unknown, we simulate user not being found in DB.
    if (password === "unknown") {
      return res(ctx.data({ login: null }));
    } else {
      return res(
        ctx.data({
          login: {
            id: 1,
            email,
            __typename: "User",
          },
        })
      );
    }
  }),
  rest.post(
    `${process.env.NEXT_PUBLIC_URL}/api/auth/login`,
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
];
