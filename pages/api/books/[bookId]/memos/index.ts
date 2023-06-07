import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { bookId },
  } = req;
  if (req.method === "GET") {
    // bookId에 해당하는 책의 메모만 조회
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
  }
}
