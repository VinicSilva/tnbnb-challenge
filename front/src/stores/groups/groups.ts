import { defineStore } from 'pinia';

export const useGroupsStore = defineStore('groups', {
  state: () => ({
    openModalGroups: false,
    listGroups: [
      {
        name: 'Group 1',
        sub: [
          { name: 'Suporte', id: 2 },
          { name: 'Comercial', id: 1 },
          { name: 'Test', id: 1 },
        ],
        id: 1,
      },
      {
        name: 'Group 2',
        sub: [
          { name: 'Diretoria', id: 2 },
          { name: 'Fianceiro', id: 1 },
          { name: 'Leaders', id: 1 },
        ],
        id: 2,
      },
      {
        name: 'Group 3',
        sub: [
          { name: 'Varejista', id: 2 },
          { name: 'Mercadorias', id: 1 },
          { name: 'Atacado', id: 1 },
        ],
        id: 3,
      },
      {
        name: 'Group 4',
        sub: [],
        id: 4,
      },
    ],
  }),
  getters: {},
  actions: {
    OPEN_MODAL_GROUPS(value: boolean) {
      this.openModalGroups = value;
    },
  },
});
