export interface iAddPartners {
  email: string;
  id: null | number;
  password: string;
  nome_parceiro: string;
  situacao_parceiro: string;
  subdominio_id: number | null;
  data_validate_teste: null | string;
}

export interface iSearchPartners {
  page?:number;
  nome_parceiro?:number;
}