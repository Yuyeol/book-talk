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
      body: { id, page, content },
    } = req;

    const memo = await prisma.memo.upsert({
      where: {
        id,
      },
      update: {
        page,
        content,
        book: {
          connect: {
            id: parseInt(req.query.id as string),
          },
        },
      },
      create: {
        page,
        content,
        book: {
          connect: {
            id: parseInt(req.query.id as string),
          },
        },
      },
    });

    res.status(200).json({
      ok: true,
      memo,
    });
  } else if (req.method === "DELETE") {
    const {
      body: { id },
    } = req;
    const memo = await prisma.memo.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      ok: true,
      memo,
    });
  }
}
