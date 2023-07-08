import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/lib/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const {
    query: { id },
  } = req;

  const alreadyExists = await prisma.like.findFirst({
    where: {
      memoId: parseInt(id as string),
      userId: session?.user?.id,
    },
  });
  if (alreadyExists) {
    await prisma.like.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
        memo: {
          connect: {
            id: parseInt(id as string),
          },
        },
      },
    });
  }
  res.status(200).json({
    ok: true,
  });
}
