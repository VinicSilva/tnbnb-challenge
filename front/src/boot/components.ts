import { boot } from 'quasar/wrappers';
import PiMain from 'src/layouts/PiMain.vue';
import PiMenu from 'src/components/PiMenu.vue';
import PiMenuHeader from 'src/components/PiMenuHeader.vue';
import PiBreadcrumbs from 'src/components/PiBreadcrumbs.vue';
import PiTable from 'src/components/PiTable.vue';
import PiSearch from 'src/components/PiSearch.vue';
import PiDropdownLanguage from 'src/components/PiDropdownLanguage.vue';
import PiSelectLanguage from 'src/components/PiSelectLanguage.vue';
import BankPagination from 'src/components/BankPagination.vue';
import BankProfile from 'src/components/BankProfile.vue';
import PiLogo from 'src/components/PiLogo.vue';
import PiModal from 'src/components/PiModal.vue';
import PiModalFooter from 'src/components/PiModalFooter.vue';
import PiNoData from 'src/components/PiNoData.vue';
import PiCountryFlag from 'vue-country-flag-next';
import { VueDraggableNext } from 'vue-draggable-next';

export default boot(({ app }) => {
  app.component('VueDraggableNext', VueDraggableNext);
  app.component('PiMain', PiMain);
  app.component('PiMenu', PiMenu);
  app.component('PiMenuHeader', PiMenuHeader);
  app.component('PiBreadcrumbs', PiBreadcrumbs);
  app.component('PiTable', PiTable);
  app.component('PiSearch', PiSearch);
  app.component('PiNoData', PiNoData);
  app.component('PiDropdownLanguage', PiDropdownLanguage);
  app.component('PiSelectLanguage', PiSelectLanguage);
  app.component('PiCountryFlag', PiCountryFlag);
  app.component('BankPagination', BankPagination);
  app.component('BankProfile', BankProfile);
  app.component('PiModal', PiModal);
  app.component('PiModalFooter', PiModalFooter);
  app.component('PiLogo', PiLogo);
});
