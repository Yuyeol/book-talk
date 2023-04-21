import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { name, background, text },
  } = req;
  const tag = await prisma.tag.create({
    data: {
      name: name,
      bgColor: background,
      txtColor: text,
    },
  });

  res.status(200).json({
    ok: true,
    tag,
  });
}
