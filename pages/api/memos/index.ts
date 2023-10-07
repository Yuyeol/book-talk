import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // 내 book에 해당하는 메모들만 가져오기
    const {
      query: { bookId, page, limit },
    } = req;
    if (bookId) {
      const memos = await prisma.memo.findMany({
        where: {
          bookId: parseInt(bookId as string),
        },
      });
      res.status(200).json({
        ok: true,
        memos,
      });
    } else {
      const memos = await prisma.memo.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: limit ? parseInt(limit as string) : undefined,
        skip: limit
          ? parseInt(page as string) * parseInt(limit as string)
          : undefined,
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
