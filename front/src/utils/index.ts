import { useTranslate } from 'src/composable/translate';
const { translate } = useTranslate();

export * from './functions/modal';
export * from './functions/paginate';
export * from './functions/validate';
export * from './functions/upload';

export const isBtnGrid = (grid: boolean) => {
  return {
    icon: grid ? 'mdi-format-list-bulleted' : 'mdi-view-grid',
    title: grid ? 'Visualizar modo lista' : 'Visualizar modo card',
  };
};

export const configStatus = (status: string) => {
  switch (status) {
    case 'B':
      return { label: translate.value.blocked, color: 'red' };
    case 'I':
      return { label: translate.value.inactive, color: 'orange' };
    case 'T':
      return { label: translate.value.test, color: 'blue' };
    default:
      return { label: translate.value.active, color: 'green' };
  }
};

export const configProfileUser = (type: string) => {
  switch (type) {
    case 'admin':
      return translate.value.administrator;
    case 'customer':
      return translate.value.partners; //todo: BNBZ
  }
};

export const isTokenExpired = (token: string) => {
  return false; // todo: remove
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  const { exp } = JSON.parse(jsonPayload);
  const expired = Date.now() >= exp * 1000;
  return expired;
};

export const formatPrice = (price: number, language: string) => {
  let countryFormatPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  });
  switch(language) {
    case 'en-US':
      countryFormatPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
      break;
    case 'es':
      countryFormatPrice = new Intl.NumberFormat('es', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2
      });
      break;
  }
  return countryFormatPrice.format(price/100)
};
