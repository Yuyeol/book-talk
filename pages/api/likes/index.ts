import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const {
      query: { memoId },
    } = req;
    const likes = await prisma.like.findMany({
      where: {
        memoId: parseInt(memoId as string),
      },
    });
    res.status(200).json({
      ok: true,
      likes,
    });
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const {
      body: { memoId },
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
            id: memoId,
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
    const like = await prisma.like.delete({
      where: {
        id: parseInt(id as string),
      },
    });
    res.status(200).json({
      ok: true,
      like,
    });
  }
}
