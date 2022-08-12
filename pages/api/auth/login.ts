import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.body;
  console.log(user);
  req.session.user = {
    id: user,
  };

  await req.session.save();
  res.send({ ok: true });
}
