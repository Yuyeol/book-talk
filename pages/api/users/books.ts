import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    if (session?.user) {
      const books = await prisma.book.findMany({
        where: {
          user: {
            email: session.user.email as string,
          },
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
        },
      });
      res.status(200).json({
        ok: true,
        books,
      });
    }
  }
}
