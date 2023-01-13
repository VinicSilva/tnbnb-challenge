import { defineStore } from 'pinia';

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    openModalPlaylist: false,
    listReports: [
      { label: 'Reports Page', value: 1, link: false },
      { label: 'Reports Test', value: 2, link: false },
      { label: 'Reports show', value: 3, link: false },
    ],
    listPlaylist: [
      {
        name: 'Apresentação',
        time: 20,
        user: 'Gerente de RH',
        id: 1,
      },
      {
        name: 'Shopping',
        time: 10,
        user: 'Pedro',
        id: 2,
      },
      {
        name: 'Slider ok assaas aaa',
        time: 15,
        user: 'José',
        id: 3,
      },
      {
        name: 'Preview',
        time: 12,
        user: 'José',
        id: 4,
      },
      {
        name: 'Reports',
        time: 30,
        user: 'Maria',
        id: 5,
      },
      {
        name: 'Reports',
        time: 30,
        user: 'Test',
        id: 6,
      },
    ],
  }),
  getters: {},
  actions: {
    OPEN_MODAL_PLAYLISTS(value: boolean) {
      this.openModalPlaylist = value;
    },
  },
});
