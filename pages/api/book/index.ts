import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const books = await prisma.book.findMany();

  res.status(200).json({
    ok: true,
    books,
  });
}
