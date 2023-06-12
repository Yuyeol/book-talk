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
    const comments = await prisma.comment.findMany({
      where: {
        memoId: parseInt(memoId as string),
      },
      include: {
        user: { select: { name: true, nickname: true, image: true } },
      },
    });
    res.status(200).json({
      ok: true,
      comments,
    });
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const {
      body: { content, memoId },
    } = req;
    const comment = await prisma.comment.create({
      data: {
        content,
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
      comment,
    });
  } else if (req.method === "DELETE") {
    const {
      body: { id },
    } = req;
    const comment = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      ok: true,
      comment,
    });
  }
}
