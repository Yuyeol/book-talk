import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // const tags = await prisma.tag.findMany();
    // res.status(200).json({
    //   ok: true,
    //   tags,
    // });
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
