import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { bookId },
  } = req;
  if (req.method === "GET") {
    const memos = await prisma.memo.findMany({
      where: {
        bookId: parseInt(bookId as string),
      },
      include: {
        user: { select: { id: true, name: true, nickname: true } },
        comments: {
          include: {
            user: { select: { name: true, nickname: true, image: true } },
          },
        },
        likes: true,
      },
    });
    res.status(200).json({
      ok: true,
      memos,
    });
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const {
      body: { id, page, content },
    } = req;

    const memo = await prisma.memo.upsert({
      where: {
        id,
      },
      update: {
        page,
        content,
        books: {
          connect: {
            id: parseInt(bookId as string),
          },
        },
      },
      create: {
        page,
        content,
        books: {
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
    const {
      body: { id },
    } = req;
    const memo = await prisma.memo.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      ok: true,
      memo,
    });
  }
}
