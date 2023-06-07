import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // 소셜에서 사용하기 위해 모든 메모 조회
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
