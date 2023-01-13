import { defineStore } from 'pinia';

export const useDepartmentStore = defineStore('department', {
  state: () => ({
    openModalDepartment: false,
    listDeprtment: [
      { name: 'Ti', id: 1 },
      { name: 'Financeiro', id: 2 },
      { name: 'Comercial', id: 3 },
    ],
  }),
  getters: {},
  actions: {
    OPEN_MODAL_DEPARTMENT(value: boolean) {
      this.openModalDepartment = value;
    },
  },
});
