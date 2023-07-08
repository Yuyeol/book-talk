import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    const {
      query: { id },
    } = req;
    const memo = await prisma.memo.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });
    const isLiked = Boolean(
      await prisma.like.findFirst({
        where: {
          memoId: parseInt(id as string),
          userId: session?.user?.id,
        },
        select: {
          id: true,
        },
      })
    );

    res.status(200).json({
      ok: true,
      memo,
      isLiked,
    });
  } else if (req.method === "POST") {
    const { bookId, id } = req.query;

    const session = await getServerSession(req, res, authOptions);
    const {
      body: { page, content },
    } = req;

    const memo = await prisma.memo.upsert({
      where: {
        id: parseInt(id as string),
      },
      update: {
        page,
        content,
        book: {
          connect: {
            id: parseInt(bookId as string),
          },
        },
      },
      create: {
        page,
        content,
        book: {
          connect: {
            id: parseInt(bookId as string),
          },
        },
        user: {
          connect: {
            email: session?.user?.email as string,
          },
        },
      },
    });

    res.status(200).json({
      ok: true,
      memo,
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const memo = await prisma.memo.delete({
      where: {
        id: parseInt(id as string),
      },
    });
    res.status(200).json({
      ok: true,
      memo,
    });
  }
}
