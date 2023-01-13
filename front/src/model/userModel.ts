import { iPagination, iSearch } from './config';

export interface iStateUser {
  openModalUser: boolean;
  loadingTable: boolean;
  loading?: boolean;
  listUsers: iUser[];
  pagination: iPagination;
}

export interface iSearchUser extends iSearch {}

export interface iUser {
  ativar_filtro: string;
  email: string;
  grupo_user_id: null | number;
  id: number;
  nome_usuario: string;
  parceiro_id: number | null;
  perfil_usuario: string;
  situacao_usuario: string;
  tipo_filtro: null | number;
  trocar_senha: string;
  username: string;
  type: string;
}
