import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

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
    const session = await getServerSession(req, res, authOptions);
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
        user: {
          connect: {
            email: session?.user?.email as string,
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
