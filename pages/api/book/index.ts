import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);

  if (req.method === "GET") {
    const books = await prisma.book.findMany();
    res.status(200).json({
      ok: true,
      books,
    });
  } else if (req.method === "POST") {
    // const { body } = req;
    // console.log(body);

    // const book = await prisma.book.create({});
    res.status(200).json({
      ok: true,
    });
  }
}
