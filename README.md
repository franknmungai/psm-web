```js
npm install bcrypt

const bcrypt = require('bcrypt');

// Function to hash a password
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // You can adjust this number based on your security needs
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

// Function to compare a password with its hash
const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};

```

```js
import { hashPassword } from '../path/to/passwordUtils';
import db from '../path/to/database';

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);

    // Save username and hashedPassword to your database
    await db.saveUser({ username, password: hashedPassword });

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default registerUser;
```

```js
const crypto = require('crypto');

// Encryption function
const encryptPassword = (password, encryptionKey) => {
  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  let encryptedPassword = cipher.update(password, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');
  return encryptedPassword;
};

// Decryption function
const decryptPassword = (encryptedPassword, encryptionKey) => {
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
  let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
  decryptedPassword += decipher.final('utf8');
  return decryptedPassword;
};

// Example usage
const password = 'mySecretPassword';
const encryptionKey = 'mySecretKey';

const encryptedPassword = encryptPassword(password, encryptionKey);
console.log('Encrypted Password:', encryptedPassword);

const decryptedPassword = decryptPassword(encryptedPassword, encryptionKey);
console.log('Decrypted Password:', decryptedPassword);
```
