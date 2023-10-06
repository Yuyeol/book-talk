import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const {
      query: { userId, page, limit },
    } = req;
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
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
      take: limit ? parseInt(limit as string) : undefined,
      skip: limit
        ? parseInt(page as string) * parseInt(limit as string)
        : undefined,
    });
    res.status(200).json({
      ok: true,
      books,
    });
  }
}
