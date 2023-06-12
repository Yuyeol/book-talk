import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const {
      query: { bookId },
    } = req;
    if (bookId) {
      const memos = await prisma.memo.findMany({
        where: {
          bookId: parseInt(bookId as string),
        },
        include: {
          user: { select: { id: true, name: true, nickname: true } },
          likes: true,
        },
      });
      res.status(200).json({
        ok: true,
        memos,
      });
    } else {
      const memos = await prisma.memo.findMany({
        include: {
          user: { select: { id: true, name: true, nickname: true } },
          likes: true,
        },
      });
      res.status(200).json({
        ok: true,
        memos,
      });
    }
  } else if (req.method === "POST") {
    res.status(200).json({
      ok: true,
    });
  }
}
