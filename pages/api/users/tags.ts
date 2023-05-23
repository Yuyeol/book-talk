import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    const tags = await prisma.tag.findMany({
      where: {
        user: {
          email: session?.user?.email as string,
        },
      },
    });
    res.status(200).json({
      ok: true,
      tags,
    });
  }
}
