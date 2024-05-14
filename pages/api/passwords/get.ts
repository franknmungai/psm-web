import prisma from '@/utils/db';
import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { key } from './utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let passwordData = await prisma.passwords.findMany({
      select: {
        id: true,
        website: true,
        username: true,
        password: true,

        user_id: true,
        createdAt: true,
      },
    });

    passwordData = passwordData.map((record) => {
      const decryptedPass = decrypt(record.password, key)!;

      // return Object.assign({}, record, { password:  })
      return {
        ...record,
        password: decryptedPass,
      };
    });

    console.log('____________AFTER MAPPING____________');
    console.log({ passwordData });

    res.status(200).json(passwordData);
  } catch (error) {
    console.clear();
    console.log(error);
    res.status(500).send(error);
  }
}

function decryptData(encryptedData: string, iv: any, key: any) {
  // Validate key length before hashing (ensure valid input)
  if (key.length !== 32) {
    throw new Error(
      'Invalid key length. Key should be 32 bytes (256 bits) for AES-256'
    );
  }

  let secretKey = hashStringTo32Bytes(key);

  const algorithm = 'aes-256-gcm';

  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(iv, 'hex')
  );

  try {
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8'); // Decrypt from hex to utf8
    decryptedData += decipher.final('utf8');
    return decryptedData;
  } catch (error: any) {
    console.error('Decryption error:', error.message);
    // Handle decryption error (e.g., invalid data, wrong key)
    throw error; // Re-throw the error for further handling
  }
}

function hashStringTo32Bytes(text: string) {
  const hash = crypto.createHash('sha256').update(text).digest('hex');
  return hash.slice(0, 32); // Take the first 32 characters of the hash (hex string)
}

const decrypt = (encryptedText: string, secretKey: string) => {
  try {
    const textParts = encryptedText.split(':');
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedData = Buffer.from(textParts[1], 'hex');
    const key = crypto
      .createHash('sha256')
      .update(secretKey)
      .digest('base64')
      .slice(0, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    const decrypted = decipher.update(encryptedData);
    const decryptedText = Buffer.concat([decrypted, decipher.final()]);
    return decryptedText.toString();
  } catch (error) {
    console.log(error);
  }
};
