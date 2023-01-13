import { iPagination } from 'src/model/config';
export interface iWhitelabel {
  id: null | number;
  logo: string;
  button: string;
  header: string;
  active?: string;
  modal: string;
  sidebar_text: string;
  sidebar_icon: string;
  login_background: string;
  card_login: string;
  sidebar: string;
  name: string;
}

export interface iWhitelabelState {
  openModalWhitelabel: boolean;
  loadingTable: boolean;
  loadingModal: boolean;
  listWhitelabels: [];
  pagination: iPagination;
  formWhitelabel: iWhitelabel;
}
