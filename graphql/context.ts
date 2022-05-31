import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next/dist";
import { prisma } from "../lib/prisma";
import { IronSessionData } from "iron-session";
export type Context = {
  prisma: PrismaClient;
  session: IronSessionData;
};

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  console.log(req.session);
  return {
    prisma,
    session: req.session,
  };
}
