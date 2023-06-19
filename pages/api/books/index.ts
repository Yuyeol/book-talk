import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const {
      query: { userId },
    } = req;

    if (userId) {
      const books = await prisma.book.findMany({
        where: {
          userId: userId as string,
        },
        select: {
          id: true,
          author: true,
          title: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          description: true,
          tags: true,
          userId: true,
        },
      });
      res.status(200).json({
        ok: true,
        books,
      });
    } else {
      const books = await prisma.book.findMany({
        select: {
          id: true,
          author: true,
          title: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          description: true,
          tags: true,
          userId: true,
        },
      });
      res.status(200).json({
        ok: true,
        books,
      });
    }
  }
}
