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
  const { username, password, website, user_id, id } = JSON.parse(req.body);
  console.log('________-REQ BODY__________');

  console.log(req.body);

  const encryptedPassword = encrypt(password)!;

  try {
    await prisma.passwords.update({
      where: {
        id,
      },
      data: {
        username,
        password: encryptedPassword,
        website,
        user_id,
      },
    });

    res.status(200).send({
      message: 'Password Updated Successfully',
    });
  } catch (error: any) {
    // console.clear();
    console.log(error);
    res.status(500).send(error);
  }
}
