import prisma from "@/lib/server/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { bookId, memoId },
  } = req;
  if (req.method === "GET") {
    const memo = await prisma.memo.findUnique({
      where: {
        id: parseInt(req.query.memoId as string),
      },
    });
    res.status(200).json({
      ok: true,
      memo,
    });
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const {
      body: { page, content },
    } = req;

    const memo = await prisma.memo.upsert({
      where: {
        id: parseInt(memoId as string),
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
    const memo = await prisma.memo.delete({
      where: {
        id: parseInt(memoId as string),
      },
    });
    res.status(200).json({
      ok: true,
      memo,
    });
  }
}
