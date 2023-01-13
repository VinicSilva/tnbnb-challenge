export interface iStatePowerBiTenant {
  openModalPowerBi: boolean;
  loadingModal: boolean;
  loadingTable: boolean;
  listPowerBi: iPowerBiTenant[];
  form: iPowerBiTenant;
}

export interface iPowerBiTenant {
  id: number | null;
  usuario_powerbi: string;
  nivel_autenticacao?: string | null;
  senha_powerbi: string;
  client_id_azure: string;
  client_secret_azure: string;
  diretorio_id_azure: string;
}
