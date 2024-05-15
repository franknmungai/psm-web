import crypto from 'crypto';

export const key =
  'super-str-key-87-7854102568987-4525789741235689752-47sde4de51de564d85w1sw54wd';

export const encrypt = (plainText: string, secretKey: string = key) => {
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
