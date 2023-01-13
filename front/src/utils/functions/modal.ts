import { iTitleModal } from 'src/model/config';

export const configModalTitle = (id: null | number, title: iTitleModal) => {
  return {
    text: id !== null ? title.edit : title.add,
    icon: id !== null ? 'mdi-pencil-box' : 'mdi-plus-circle',
  };
};
