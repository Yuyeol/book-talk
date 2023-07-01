import prisma from "@/lib/server/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      query: { id },
      body: { friendId, action },
    } = req;
    if (action === "add") {
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
    } else if (action === "remove") {
      const friendsTo = await prisma.user.update({
        where: {
          id: id as string,
        },
        data: {
          friendsTo: { disconnect: [{ id: friendId }] },
        },
      });
      const friendsBy = await prisma.user.update({
        where: {
          id: id as string,
        },
        data: {
          friendsBy: { disconnect: [{ id: friendId }] },
        },
      });

      res.status(200).json({
        ok: true,
        friendsTo,
        friendsBy,
      });
    }
  }
}
