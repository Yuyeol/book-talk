import prisma from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// 복붙해놓은 그대로임. 수정해야함
// 댓글 달기, 삭제하기 구현하기
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const {
      body: { content },
      query: { memoId },
    } = req;
    const comment = await prisma.comment.create({
      data: {
        content,
        user: {
          connect: {
            email: session?.user?.email as string,
          },
        },
        memo: {
          connect: {
            id: parseInt(memoId as string),
          },
        },
      },
    });
    res.status(200).json({
      ok: true,
      comment,
    });
  } else if (req.method === "DELETE") {
    const {
      body: { id },
    } = req;
    const comment = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      ok: true,
      comment,
    });
  }
}
