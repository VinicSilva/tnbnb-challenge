export interface iPaginationReponse {
  current_page: number;
  per_page: number;
  last_page: number;
}

export interface iPagination {
  current_page: number;
  per_page: number;
  totalPage: number;
}

export interface iSearch {
  search?: string;
  page?: number;
}

export interface iTitleModal {
  add: string;
  edit: string;
}

export interface iSelect {
  label: string;
  value: any;
}
