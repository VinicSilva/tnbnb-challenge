export interface iAuth {
  email: string;
  password: string;
}

export interface iUserResponse {
  name: string;
  email: string;
  nome_usuario: string;
  trocar_senha: string;
  perfil_usuario: string;
  utilizar_filtro_rls: string;
  tipo_filtro: string;
  situacao_usuario: string;
  grupo_user_id: string;
  parceiro_id: string;
  id: number;
  type: string;
  username: string;
}

export interface iAuthResponse {
  access_token: string;
  hidden_menu: string[];
  user: iUserResponse;
}
