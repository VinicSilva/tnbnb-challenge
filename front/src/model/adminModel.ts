import { iPagination, iSearch } from './config';

export interface iStateBankCheck {
  loadingTable: boolean;
  listPendingChecks: iBankCheck[];
  pagination: iPagination;
}

export interface iSearchUser extends iSearch {}

export interface iBankCheck {
  value: number;
  id: number;
  description: string;
  image: string;
  user: iBankCheckUser;
}

export interface iBankCheckUser {
  name: string;
  id: number;
  email: string;
  username: string;
}