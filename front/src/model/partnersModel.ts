import { iPagination, iPaginationReponse } from './config';
export interface iPartnersState {
  form: iPartners;
  pagination: iPagination;
  openModalPartners: boolean;
  loadingModal: boolean;
  loadingTable: boolean;
  listPartners: iPartners[];
}

export interface iPartners {
  id: null | number;
  user_id: null | number;
  nome_parceiro: string;
  email: string;
  password: string;
  situacao_parceiro: string;
  situacao_usuario?: string;
  subdominio?: string;
  subdominio_id: null | number;
  data_validate_teste: null | string;
}
