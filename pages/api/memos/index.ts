import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const memos = await prisma.memo.findMany({
      include: { user: { select: { id: true, name: true, nickname: true } } },
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
