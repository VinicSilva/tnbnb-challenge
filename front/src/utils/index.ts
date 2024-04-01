import { useTranslate } from 'src/composable/translate';
const { translate } = useTranslate();

export * from './functions/modal';
export * from './functions/paginate';
export * from './functions/validate';
export * from './functions/upload';

export const configProfileUser = (type: string) => {
  switch (type) {
    case 'admin':
      return translate.value.administrator;
    case 'customer':
      return translate.value.users;
  }
};

export const isTokenExpired = (token: string) => {
  return false; // todo: remove
};
