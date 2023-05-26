import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;
  const session = await getServerSession(req, res, authOptions);
  if (session?.user) {
    if (req.method === "GET") {
      const user = await prisma.user.findUnique({
        where: {
          id: id as string,
        },
        select: {
          id: true,
          email: true,
          name: true,
          nickname: true,
          image: true,
          friendsTo: true,
        },
      });

      res.status(200).json({
        ok: true,
        user,
      });
    } else if (req.method === "POST") {
      // 이후 프로필 수정 만들때
      const user = await prisma.user.update({
        where: {
          id: id as string,
        },
        data: {
          nickname: req.body.nickname,
        },
      });

      res.status(200).json({
        ok: true,
        user,
      });
    }
  } else {
    res.status(403).json({
      ok: false,
    });
  }
}
