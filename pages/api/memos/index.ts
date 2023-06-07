import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

// 소셜용 메모 전체조회
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const memos = await prisma.memo.findMany({
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
    res.status(200).json({
      ok: true,
    });
  }
}
