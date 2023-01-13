import { iPagination, iSearch } from './config';

export interface iFormPurchase {
  id: null | number;
  description: string;
  value: string | number;
  purchase_date: string | Date;
}

export interface iStateExpenses {
  loadingTable: boolean;
  listExpenses: iExpense[];
  openModalExpense: boolean;
  loadingModal: boolean;
  pagination: iPagination;
  form: iFormPurchase;
}

export interface iSearchUser extends iSearch {}

export interface iExpense {
  value: number;
  id: number;
  description: string;
  purchase_date: string | Date;
  created_at: string | Date;
  user: iExpenseUser;
}

export interface iExpenseUser {
  name: string;
  id: number;
  email: string;
  username: string;
}