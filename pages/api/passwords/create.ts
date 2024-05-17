// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { encrypt } from './utils';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password, website, user_id } = req.body;

  console.log({ username, password, website, user_id });

  const encryptedPassword = encrypt(password)!;

  try {
    const data = await prisma.passwords.create({
      data: {
        username,
        password: encryptedPassword,
        website,
        user_id,
      },
    });

    res.status(200).send({
      message: 'Password Saved Successfully',
    });
  } catch (error: any) {
    // console.clear();
    console.log(error);
    res.status(500).send(error);
  }
}
