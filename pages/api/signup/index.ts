import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const SALT_ROUNDS = 10;

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const exists = await prisma.user.findFirst({
      where: { userId: email },
    });

    if (exists) {
      return res.status(401).json({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);

    const result = await prisma.user.create({
      data: {
        name: username ?? "John Doe",
        userId: email,
        password: hash,
      },
    });

    return res.status(201).json({
      status: 201,
      message: "Account created successfully",
      result: result.id,
    });
  } else res.status(200).json({ name: "John Doe" });
}
