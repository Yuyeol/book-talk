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
      const tags = await prisma.tag.findMany({
        where: {
          userId: userId as string,
        },
      });
      res.status(200).json({
        ok: true,
        tags,
      });
    } else {
      const tags = await prisma.tag.findMany();
      res.status(200).json({
        ok: true,
        tags,
      });
    }
  }
}
