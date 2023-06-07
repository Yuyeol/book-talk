import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const {
      query: { memoId },
    } = req;
    const like = await prisma.like.create({
      data: {
        user: {
          connect: {
            email: session?.user?.email as string,
          },
        },
        memo: {
          connect: {
            id: parseInt(memoId as string),
          },
        },
      },
    });
    res.status(200).json({
      ok: true,
      like,
    });
  } else if (req.method === "DELETE") {
    const {
      body: { id },
    } = req;

    const like = await prisma.like.deleteMany({
      where: { id },
    });
    res.status(200).json({
      ok: true,
      like,
    });
  }
}
