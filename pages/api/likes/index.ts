import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // 사용하지 않을듯
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
      query: { memoId },
    } = req;
    const isLiked = Boolean(
      await prisma.like.findFirst({
        where: {
          memoId: parseInt(memoId as string),
          userId: session?.user?.id,
        },
        select: {
          id: true,
        },
      })
    );
    const alreadyExists = await prisma.like.findFirst({
      where: {
        memoId: parseInt(memoId as string),
        userId: session?.user?.id,
      },
    });

    if (alreadyExists) {
      await prisma.like.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          user: {
            connect: {
              id: session?.user?.id,
            },
          },
          memo: {
            connect: {
              id: parseInt(memoId as string),
            },
          },
        },
      });
    }
    res.status(200).json({
      ok: true,
      isLiked,
    });
  }
}
