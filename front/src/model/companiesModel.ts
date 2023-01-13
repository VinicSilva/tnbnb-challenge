import { iSearch, iPagination } from './config';

export interface iSearchCompanies extends iSearch {}

export interface iUserCompanies {
  email: string;
  id: number;
}
export interface iCompanies extends iFormCompanies {
  conta_powerbi: null;
  permite_definir_subdominio: string;
  permite_definir_tema: string;
  parceiro_id?: number;
  tema_id?: number;
  subdominio_id?: number;
  filtros_tenant?: iCompaniesFilter[];
  user: iUserCompanies[];
}

export interface iCompaniesFilter {
  filtro_coluna: string;
  filtro_tabela: string;
  filtro_valor: string;
  parametro_rls: string;
  regra_rls: string;
}

export interface iFormCompanies {
  id: null | number;
  userId: null | number;
  nome_tenant: string;
  email?: string;
  password?: string;
  tipo_filtro?: string;
  limit_usuarios: number;
  ativar_filtro: string;
  conta_powerbi: string;
  ativar_ris: string;
  permite_definir_subdominio: string;
  permite_definir_tema: string;
  listFilter: iCompaniesFilter[];
  listRis: iCompaniesFilter[];
}

export interface iStateCompanies {
  openModal: boolean;
  loadingModal: boolean;
  loadingTable: boolean;
  listCompanies: iCompanies[];
  form: iFormCompanies;
  pagination: iPagination;
}
