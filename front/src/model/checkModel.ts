import { iPagination, iSearch } from './config';

export interface iFormCheck {
  id: null | number;
  description: string;
  value: string | number;
  image: string;
}

export interface iStateCheck {
  loadingTable: boolean;
  listChecks: iCheck[];
  openModalCheck: boolean;
  loadingModal: boolean;
  pagination: iPagination;
  form: iFormCheck;
}

export interface iSearchUser extends iSearch {
  status?: string;
}

export interface iCheck {
  value: number;
  id: number;
  description: string;
  image: string;
  created_at: string | Date;
  user: iCheckUser;
}

export interface iCheckUser {
  name: string;
  id: number;
  email: string;
  username: string;
}