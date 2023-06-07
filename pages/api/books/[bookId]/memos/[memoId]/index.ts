import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  }
}
