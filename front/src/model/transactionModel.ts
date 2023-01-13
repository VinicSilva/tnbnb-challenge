import { iPagination, iSearch } from './config';

export interface iStateTransaction {
  loadingTable: boolean;
  listTransactions: iTransaction[];
  pagination: iPagination;
}

export interface iSearchUser extends iSearch {}

export interface iTransaction {
  value: number;
  id: number;
  type: string;
  created_at: string | Date;
  user: iTransactionUser;
  purchase?: iPurchase;
  check?: iCheck;
}

export interface iTransactionUser {
  name: string;
  id: number;
  email: string;
  username: string;
}

export interface iPurchase {
  description: string;
}

export interface iCheck {
  description: string;
}