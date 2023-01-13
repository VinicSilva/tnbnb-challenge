import { iPaginationReponse, iPagination } from 'src/model/config';

export const configPagination = (
  paginate: iPaginationReponse = {} as iPaginationReponse
): iPagination => {
  return {
    totalPage: paginate?.last_page || 1,
    per_page: paginate?.per_page || 10,
    current_page: paginate?.current_page || 1,
  };
};
