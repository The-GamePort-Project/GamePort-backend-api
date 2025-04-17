import * as bcrypt from 'bcrypt';
import { AuthConfig } from './auth.config';
export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, AuthConfig.SALT_ROUNDS);
  return hashedPassword;
};

export const comparePasswords = async (
  incomingPassword: string,
  existingHashedPassword: string,
) => {
  return await bcrypt.compare(incomingPassword, existingHashedPassword);
};
