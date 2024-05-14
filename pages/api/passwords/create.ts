// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { key } from './utils';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password, website, user_id } = JSON.parse(req.body);

  console.log({ username, password, website, user_id });

  const encryptedPassword = encrypt(password, key)!;

  try {
    const data = await prisma.passwords.create({
      data: {
        username,
        password: encryptedPassword,
        website,
        user_id,
      },
    });

    console.log({ createdData: data });

    res.status(200).send({
      message: 'Password Saved Successfully',
    });
  } catch (error: any) {
    // console.clear();
    console.log(error);
    res.status(500).send(error);
  }
}

function hashStringTo32Bytes(text: string) {
  const hash = crypto.createHash('sha256').update(text).digest('hex');
  return hash.slice(0, 32); // Take the first 32 characters of the hash (hex string)
}

function encryptData(data: string, key: string) {
  let secretKey = hashStringTo32Bytes(key);

  // Validate key length (ensure it matches algorithm requirements)
  if (secretKey.length !== 32) {
    throw new Error(
      'Invalid key length. Key should be 32 bytes (256 bits) for AES-256'
    );
  }

  const algorithm = 'aes-256-gcm'; // Use a strong authenticated encryption mode
  const iv = crypto.randomBytes(12); // Use recommended 12-byte IV for GCM

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encryptedData = cipher.update(data, 'utf8', 'hex'); // Encrypt and convert to hex

  encryptedData += cipher.final('hex');

  // Return the encrypted data and initialization vector (for decryption)
  return {
    data: encryptedData,
    iv: iv.toString('hex'), // Convert IV to hex string
  };
}

const encrypt = (plainText: string, secretKey: string) => {
  try {
    const iv = crypto.randomBytes(16);
    const key = crypto
      .createHash('sha256')
      .update(secretKey)
      .digest('base64')
      .slice(0, 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  } catch (error) {
    console.log(error);
  }
};
