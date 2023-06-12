import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bookId } = req.query;
  if (req.method === "GET") {
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
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const {
      body: { title, author, description, imageSrc, selectedTags },
    } = req;
    if (session?.user) {
      const tagIds = selectedTags.map((id: string) => ({ id }));
      const book = await prisma.book.upsert({
        where: {
          id: parseInt(bookId as string),
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
    const book = await prisma.book.delete({
      where: {
        id: parseInt(bookId as string),
      },
    });
    res.status(200).json({
      ok: true,
      book,
    });
  }
}
