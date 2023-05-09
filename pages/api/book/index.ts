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
        description: true,
        tags: true,
      },
    });
    res.status(200).json({
      ok: true,
      books,
    });
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const {
      body: { id, title, author, description, imageSrc, selectedTags },
    } = req;
    if (session?.user) {
      const tagIds = selectedTags.map((id: string) => ({ id }));
      const book = await prisma.book.upsert({
        where: {
          id: id,
        },
        update: {
          title,
          author,
          description,
          image: imageSrc,
          user: {
            connect: {
              email: session.user.email as string,
            },
          },
          tags: { connect: tagIds },
        },
        create: {
          title,
          author,
          description,
          image: imageSrc,
          user: {
            connect: {
              email: session.user.email as string,
            },
          },
          tags: { connect: tagIds },
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
  } else if (req.method === "DELETE") {
    const {
      body: { id },
    } = req;
    const book = await prisma.book.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      ok: true,
      book,
    });
  }
}
