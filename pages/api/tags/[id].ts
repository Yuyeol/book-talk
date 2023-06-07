import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "GET") {
    const tag = await prisma.tag.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });
    res.status(200).json({
      ok: true,
      tag,
    });
  } else if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const {
      body: { name, background, text },
    } = req;

    const tag = await prisma.tag.upsert({
      where: {
        id: parseInt(id as string),
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
        user: {
          connect: {
            email: session?.user?.email as string,
          },
        },
      },
    });
    res.status(200).json({
      ok: true,
      tag,
    });
  }
  if (req.method === "DELETE") {
    const tag = await prisma.tag.delete({
      where: {
        id: parseInt(id as string),
      },
    });
    res.status(200).json({
      ok: true,
      tag,
    });
  }
}
