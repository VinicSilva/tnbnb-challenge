import { LocalStorage } from 'quasar';
import { computed } from 'vue';
import * as crypto from 'crypto-js';

export function useAuth() {
  const getUserLogged = computed(() => {
    const data = getUserCache();
    return data ?? {};
  });

  const isLoggedIn = computed(() => {
    const data = getUserCache();
    return !!data?.token;
  });

  const getToken = computed(() => {
    const data = getUserCache();
    return data?.token ?? null;
  });

  const getListHiddenMenu = computed(() => {
    const data = getUserCache();
    return data.hidden_menu;
  });

  const setUserCache = (payload: any) => {
    const data = {
      ...payload.user,
      token: payload.access_token,
      hidden_menu: payload.hidden_menu,
    };
    const dataEncrypt = cacheEncrypt(JSON.stringify(data));
    LocalStorage.set('pi:cache', dataEncrypt);
  };

  const getUserCache = () => {
    const storage: string | null = LocalStorage.getItem('pi:cache');
    return cacheDecrypt(storage);
  };

  const cacheEncrypt = (payload: string) => {
    return crypto.AES.encrypt(payload, window.origin).toString();
  };

  const cacheDecrypt = (payload: string | null) => {
    if (payload) {
      const data = crypto.AES.decrypt(payload, window.origin).toString(
        crypto.enc.Utf8
      );
      return JSON.parse(data);
    }
    return '';
  };

  const getLanguage = () => {
    const lang: string = LocalStorage.getItem('pi:lang') ?? 'pt-BR';
    return lang;
  }

  const logout = () => {
    LocalStorage.remove('pi:cache');
    window.location.href = '/signin';
  };

  return {
    isLoggedIn,
    getUserLogged,
    getToken,
    getListHiddenMenu,
    getLanguage,
    setUserCache,
    logout,
  };
}
