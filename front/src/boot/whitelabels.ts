import { boot } from 'quasar/wrappers';
import logo from 'src/assets/logo.svg';

export default boot(async ({ app }) => {
  const whitelabels = {
    button: '#2b5177',
    modal: '#2b5177',
    sidebar: '#fff',
    sidebar_icon: '#4c4c4c',
    sidebar_text: '#4c4c4c',
    header: '#2b5177',
    login_background: '#6887a7',
    card_login: '#ffffffdb',
    logo,
  };

  app.directive('theme-menu-header', (el) => {
    el.style.background = whitelabels.header;
  });

  app.directive('theme-card-login', (el) => {
    el.style.background = whitelabels.card_login;
  });

  app.directive('theme-sidebar-icon', (el) => {
    el.style.color = whitelabels.sidebar_icon;
  });

  app.directive('theme-sidebar-text', (el) => {
    el.style.color = whitelabels.sidebar_text;
  });

  app.directive('theme-login-background', (el) => {
    el.style.background = whitelabels.login_background;
  });

  app.directive('theme-button', (el) => {
    el.style.background = whitelabels.button;
  });

  app.directive('theme-modal', (el) => {
    el.style.background = whitelabels.modal;
  });

  app.directive('theme-loading', (el) => {
    el.style.color = whitelabels.modal;
  });

  app.directive('theme-sidebar', (el) => {
    const drawer = el.querySelector('.q-drawer');
    drawer.style.background = whitelabels.sidebar;
  });

  app.directive('theme-logo', (el) => {
    const img = el.querySelector('img');
    img.src = whitelabels.logo;
  });
});
