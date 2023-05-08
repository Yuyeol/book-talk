import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const memos = await prisma.memo.findMany({
      // select: {},
    });
    res.status(200).json({
      ok: true,
      memos,
    });
  } else if (req.method === "POST") {
    const {
      body: { id },
    } = req;
    // const memo = await prisma.memo.upsert({
    //   where: {
    //     id: id,
    //   },
    //   update: {},
    //   create: {},
    // });
    res.status(200).json({
      ok: true,
      //   memo,
    });
  }
}
