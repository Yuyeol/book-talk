import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Tag } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        author: true,
        title: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json({
      ok: true,
      books,
    });
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const { body } = req;
    if (session?.user) {
      const book = await prisma.book.create({
        data: {
          title: body.title,
          author: body.author,
          description: body.description,
          image: body.imageSrc,
          User: {
            connect: {
              email: session.user.email as string,
            },
          },
          Tags: {
            connect: body.selectedTags.map((tag: Tag) => ({
              id: tag,
            })),
          },
        },
      });
      res.status(200).json({
        ok: true,
        book,
      });
    } else {
      res.status(401).json({
        ok: false,
      });
    }
  }
}
