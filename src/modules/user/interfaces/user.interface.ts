import { User } from '@prisma/client';

export interface IUser extends User {
  fullName?: string;
}
type Role = 'USER' | 'ADMIN';
export interface SafeUser extends Omit<IUser, 'password'> {
  id: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  username: string;
  provider: string;
  googleId: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
