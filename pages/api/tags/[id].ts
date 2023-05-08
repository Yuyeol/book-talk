import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const tag = await prisma.tag.findUnique({
    where: {
      id: parseInt(id as string),
    },
  });
  res.status(200).json({
    ok: true,
    tag,
  });
}
