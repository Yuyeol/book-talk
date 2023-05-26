import prisma from "@/lib/server/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // user 안에 friends 타입 어쩔건데
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: { id: req.query.id as string },
      include: { friendsTo: true },
    });
    res.status(200).json({
      ok: true,
      user,
    });
  } else if (req.method === "POST") {
    const {
      query: { id },
      body: { friendId },
    } = req;
    // 친구추가 update
    const friendsTo = await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        friendsTo: { connect: [{ id: friendId }] },
      },
    });
    const friendsBy = await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        friendsBy: { connect: [{ id: friendId }] },
      },
    });

    res.status(200).json({
      ok: true,
      friendsTo,
      friendsBy,
    });
  }
}
