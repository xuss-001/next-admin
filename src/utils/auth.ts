import {
  createHmac
} from 'crypto';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return secret;
};

export const encrypt = (content: string) => {
  const secret = getJwtSecret();
  const hash = createHmac("md5", secret);
  hash.update(content);
  return hash.digest('hex');
};