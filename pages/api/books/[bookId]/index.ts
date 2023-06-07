import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bookId } = req.query;
  const book = await prisma.book.findUnique({
    where: {
      id: parseInt(bookId as string),
    },
    select: {
      id: true,
      image: true,
      title: true,
      author: true,
      description: true,
      tags: true,
      userId: true,
    },
  });
  res.status(200).json({
    ok: true,
    book,
  });
}
