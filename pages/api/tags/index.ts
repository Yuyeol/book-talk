import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const tags = await prisma.tag.findMany();
    res.status(200).json({
      ok: true,
      tags,
    });
  } else if (req.method === "POST") {
    const {
      body: { name, background, text, id, isDelete },
    } = req;
    if (isDelete) {
      const tag = await prisma.tag.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        ok: true,
        tag,
      });
    } else {
      const tag = await prisma.tag.upsert({
        where: {
          id: id,
        },
        update: {
          name: name,
          bgColor: background,
          txtColor: text,
        },
        create: {
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
  }
}
