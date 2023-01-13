<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <bank-breadcrumbs :breadcrumbs="listBreadcrumbs" />
      </div>
      <div class="col-12">
        <bi-table
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
          :columns="columns"
          :rows="data"
          :loading="loading"
          :custom-slot="{ 'body-cell': ['actions', 'limit'] }"
          v-model:selected="selected"
          row-key="id"
        >
          <template v-slot:top>
            <bi-search
              style="top: 10px"
              v-model="search"
              :disable-remove="!selected.length"
              @add="openModal"
              @remove="removelAll(selected)"
              @search="searchCompanies"
              class="relative-position"
            >
              <template #title>
                <b>{{ translate.companies }}</b>
              </template>
            </bi-search>
          </template>
          <template v-slot:body-cell-limit="{ props }">
            <q-td align="center">
              <q-badge v-theme-menu-header>
                {{ props.limit_usuarios }}
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="{ props }">
            <q-td width="100px" align="center">
              <bi-dropdown-actions
                @remove="remove(props)"
                @edit="edit(props)"
              />
            </q-td>
          </template>
          <template v-slot:no-data>
            <bi-no-data />
          </template>
          <template v-slot:bottom>
            <bi-pagination
              :pagination="pagination"
              v-model="pagination.current_page"
              @request="updatePagination"
            />
          </template>
        </bi-table>
      </div>
    </div>
    <modal-add-companies />
  </q-page>
</template>
<script lang="ts">
import { useTranslate } from 'src/composable/translate';
import { useCompaniesStore } from 'src/stores/companies/companies';
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue';
import ModalAddCompanies from './components/ModalAddCompanies.vue';
import { iCompanies } from 'src/model/companiesModel';
import { mapFilter } from './helpers';
import { useNotification } from 'src/composable/notification';

export default defineComponent({
  name: 'CompaniesPage',
  components: { ModalAddCompanies },
  setup() {
    const { translate } = useTranslate();
    const storeCompanies = useCompaniesStore();
    const { notification } = useNotification();
    const state = reactive({
      selected: [],
      search: '',
      listBreadcrumbs: [
        { label: translate.value.companies, icon: 'mdi-office-building' },
        { label: translate.value.list.toLocaleLowerCase() },
      ],
    });

    const columns = computed(() => {
      return [
        {
          name: 'name',
          field: 'nome_tenant',
          label: translate.value.name,
          align: 'left',
        },
        {
          name: 'limit',
          field: 'limit_usuarios',
          label: translate.value.user_limit,
          align: 'center',
        },
        {
          name: 'admin',
          field: 'email',
          label: translate.value.administrator,
          align: 'left',
        },
        {
          name: 'actions',
          field: 'actions',
          label: translate.value.actions,
          align: 'center',
        },
      ];
    });

    onMounted(async () => {
      await storeCompanies.REQUEST_GET_ALL_COMPANIES();
    });

    const data = computed(() => {
      return storeCompanies.listCompanies.map((item) => {
        const isFilter = item?.tipo_filtro === 'filtro';
        const isRis = item?.tipo_filtro === 'rls';
        // user info
        const findUser = item.user.find((item) => item);
        const email = findUser?.email ?? '';
        const userId = findUser?.id ?? '';

        return {
          ...item,
          email,
          userId,
          listFilter: isFilter ? mapFilter(item.filtros_tenant, 'filtro') : [],
          listRis: isRis ? mapFilter(item.filtros_tenant, 'ris') : [],
        };
      });
    });

    const loading = computed(() => {
      return storeCompanies.loadingTable;
    });

    const pagination = computed(() => {
      return storeCompanies.pagination;
    });

    const openModal = () => {
      storeCompanies.SET_OPEN_MODAL_COMPANIES(true);
    };

    const updatePagination = async (page: number) => {
      await storeCompanies.REQUEST_GET_ALL_COMPANIES({ page });
    };

    const searchCompanies = async (search: string) => {
      await storeCompanies.REQUEST_SEARCH_COMPANIES({ search });
    };

    const remove = (props: iCompanies) => {
      notification.confirm(async () => {
        props.id && storeCompanies.REQUEST_DELETE_COMPANIES(props.id);
      });
    };

    const edit = (props: iCompanies) => {
      storeCompanies.SET_FORM_COMPANIES(props);
      openModal();
    };

    const removelAll = (props: iCompanies[]) => {
      notification.confirm(async () => {
        const ids = props.map((item) => item.id);
        storeCompanies.REQUEST_DELETE_COMPANIES(ids);
      });
    };

    return {
      translate,
      columns,
      data,
      loading,
      pagination,
      removelAll,
      updatePagination,
      searchCompanies,
      ...toRefs(state),
      remove,
      edit,
      openModal,
    };
  },
});
</script>
