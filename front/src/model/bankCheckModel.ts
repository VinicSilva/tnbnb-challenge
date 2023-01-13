import { iPagination, iSearch } from './config';

export interface iFormBankCheck {
  id: null | number;
  description: string;
  value: string | number;
  image: string;
}

export interface iStateBankCheck {
  loadingTable: boolean;
  listBankChecks: iBankCheck[];
  openModalBankCheck: boolean;
  loadingModal: boolean;
  pagination: iPagination;
  form: iFormBankCheck;
}

export interface iSearchUser extends iSearch {
  status?: string;
}

export interface iBankCheck {
  value: number;
  id: number;
  description: string;
  image: string;
  created_at: string | Date;
  user: iBankCheckUser;
}

export interface iBankCheckUser {
  name: string;
  id: number;
  email: string;
  username: string;
}