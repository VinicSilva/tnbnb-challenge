<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <bank-breadcrumbs :breadcrumbs="listBreadcrumbs" />
      </div>
      <div class="col-12">
        <bank-table
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
          :columns="[]"
          :rows="data"
          :loading="loading"
          :grid="true"
          row-key="id"
          :custom-slot="{ 'body-cell': ['actions'] }"
        >
          <template v-slot:top>
            <bank-search
              style="top: 10px"
              v-model="search"
              hidden-remove
              :disable-remove="!selected.length"
              @add="openModal"
              @search="searchWhitelabels"
              class="relative-position"
            >
              <template #title>
                <b>{{ translate.themes }}</b>
              </template>
            </bank-search>
          </template>
          <template v-slot:item="{ props }">
            <div class="col-md-3 col-xs-12 col-sm-4">
              <layout-model
                @remove="remove(props)"
                @edit="edit(props.formData)"
                :theme-name="props.name"
                :color-header="props.themes.header"
                :color-sidebar="props.themes.sidebar"
                :color-sidebar-icon="props.themes.sidebar_icon"
                :color-sidebar-text="props.themes.sidebar_text"
              >
                <template v-slot:checkbox>
                  <q-checkbox
                    v-model="props.active"
                    :val="props.id"
                    @click="changeWhitelabel(props.id)"
                    dense
                    size="xs"
                  />
                </template>
              </layout-model>
            </div>
          </template>
          <template v-slot:no-data>
            <bank-no-data />
          </template>
          <template v-slot:bottom>
            <bank-pagination
              v-model="pagination.current_page"
              :pagination="pagination"
            />
          </template>
        </bank-table>
      </div>
    </div>
    <modal-add-whitelabel />
  </q-page>
</template>
<script>
import { useTranslate } from 'src/composable/translate';
import { useWhitelabelStore } from 'src/stores/whitelabel/whitelabel';
import { defineComponent, computed, reactive, toRefs, onMounted } from 'vue';

import LayoutModel from './components/LayoutModel.vue';
import ModalAddWhitelabel from './components/ModalAddWhitelabel.vue';
import { useNotification } from 'src/composable/notification';

export default defineComponent({
  name: 'Whitelabels',
  components: { LayoutModel, ModalAddWhitelabel },
  setup() {
    const { translate } = useTranslate();
    const { notification } = useNotification();
    const storeWhitelabel = useWhitelabelStore();
    const state = reactive({
      selected: [],
      search: '',
    });

    onMounted(async () => {
      await storeWhitelabel.REQUEST_ALL_WHITELABELS();
    });

    const listBreadcrumbs = computed(() => {
      return [
        { label: translate.value.themes, icon: 'mdi-palette' },
        { label: translate.value.list.toLocaleLowerCase() },
      ];
    });

    const pagination = computed(() => {
      return storeWhitelabel.pagination;
    });

    const loading = computed(() => {
      return storeWhitelabel.loadingTable;
    });

    const data = computed(() => {
      return storeWhitelabel.listWhitelabels.map((item) => {
        return {
          name: item.name,
          id: item.id,
          name: item.name,
          active: item.active === 'S',
          formData: item,
          themes: {
            header: item.header,
            sidebar: item.sidebar,
            sidebar_icon: item.sidebar_icon,
            sidebar_text: item.sidebar_text,
          },
        };
      });
    });

    const openModal = () => {
      storeWhitelabel.OPEN_MODAL_WHITELABEL(true);
    };

    const searchWhitelabels = async (search) => {
      await storeWhitelabel.REQUEST_SEARCH_WHITELABELS({ search });
    };

    const changeWhitelabel = (id) => {
      notification.confirm(
        async () => {
          storeWhitelabel.REQUEST_SET_WHITELABEL_ACTIVE(id);
        },
        { caption: 'Você realmente deseja mudar o tema?' }
      );
    };

    const edit = (props) => {
      storeWhitelabel.SET_FORM_WHITELABEL(props);
      openModal();
    };

    const remove = (props) => {
      notification.confirm(async () => {
        await storeWhitelabel.REQUEST_DELETE_WHITELABELS(props.id);
      });
    };

    return {
      listBreadcrumbs,
      data,
      translate,
      loading,
      pagination,
      changeWhitelabel,
      edit,
      searchWhitelabels,
      ...toRefs(state),
      openModal,
      remove,
    };
  },
});
</script>
