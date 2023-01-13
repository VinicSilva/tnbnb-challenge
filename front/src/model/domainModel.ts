import { iSearch } from './config';

export interface iDomain {
  id: null | number;
  subdominio: string;
}

export interface iSearchDomain extends iSearch {
  subdominio?: string;
}

export interface iDomainState {
  listDomain: iDomain[];
  pagination: any;
  openModalDomain: boolean;
  loadingModal: boolean;
  loadingTable: boolean;
  form: iDomain;
}
