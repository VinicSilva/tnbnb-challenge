import { iCompaniesFilter } from 'src/model/companiesModel';

const returnFilter = (item: iCompaniesFilter) => {
  return {
    filtro_coluna: item.filtro_coluna,
    filtro_tabela: item.filtro_tabela,
    filtro_valor: item.filtro_valor,
  };
};

const returnRis = (item: iCompaniesFilter) => {
  return {
    parametro_rls: item.parametro_rls,
    regra_rls: item.regra_rls,
  };
};

export const mapFilter = (
  listData: iCompaniesFilter[] = [],
  type: string | null
) => {
  if (!type) return [];

  return listData.map((item) => {
    return type === 'filtro' ? returnFilter(item) : returnRis(item);
  });
};
