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
          row-key="id"
          v-model:selected="selected"
          :custom-slot="{ 'body-cell': ['actions', 'status'] }"
        >
          <template v-slot:top>
            <bi-search
              style="top: 10px"
              v-model="search"
              :disable-remove="!selected.length"
              @add="openModal"
              @search="searchPartners"
              class="relative-position"
            >
              <template #title>
                <b>{{ translate.partners }}</b>
              </template>
            </bi-search>
          </template>
          <template v-slot:body-cell-status="{ props }">
            <q-td align="center" class="q-pa-md">
              <q-badge :color="props.status.color">
                {{ props.status.label }}
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="{ props }">
            <q-td align="center" width="100px">
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
              v-model="pagination.current_page"
              :pagination="pagination"
              @request="requestPagination"
            />
          </template>
        </bi-table>
      </div>
    </div>

    <modal-add-partners />
  </q-page>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue';
import { useTranslate } from 'src/composable/translate';
import { usePartnersStore } from 'src/stores/partners/partners';
import { configStatus } from 'src/utils';
import { iPartners } from 'src/model/partnersModel';
import ModalAddPartners from './components/ModalAddPartners.vue';
import { useNotification } from 'src/composable/notification';

import dayjs from 'dayjs';

export default defineComponent({
  name: 'PartnersPage',
  components: { ModalAddPartners },
  setup() {
    const { translate } = useTranslate();
    const storePartners = usePartnersStore();
    const { notification } = useNotification();
    const state = reactive({
      selected: [],
      search: '',
      listBreadcrumbs: [
        { label: translate.value.partners, icon: 'mdi-heart' },
        { label: translate.value.list.toLocaleLowerCase() },
      ],
    });

    onMounted(async () => {
      await storePartners.REQUEST_GET_PARTERNS();
    });

    const columns = computed(() => {
      return [
        {
          label: translate.value.name,
          field: 'nome_parceiro',
          name: 'nome_parceiro',
          align: 'left',
        },
        {
          label: translate.value.domain,
          field: 'subdominio',
          name: 'subdominio',
          align: 'left',
        },
        {
          label: 'Status',
          field: 'status',
          name: 'status',
          align: 'center',
        },
        {
          label: translate.value.actions,
          field: 'actions',
          name: 'actions',
          align: 'center',
        },
      ];
    });

    const data = computed(() => {
      return storePartners.listPartners.map((item: iPartners) => {
        return {
          nome_parceiro: item.nome_parceiro,
          id: item.id,
          subdominio: item.subdominio,
          situacao_usuario: item.situacao_usuario,
          subdominio_id: item.subdominio_id,
          user_id: item.user_id,
          email: item.email,
          data_validate_teste: dateFormat(item?.data_validate_teste),
          status: configStatus(item.situacao_parceiro),
        };
      });
    });

    const pagination = computed(() => {
      return storePartners.pagination;
    });

    const loading = computed(() => {
      return storePartners.loadingTable;
    });

    const openModal = () => {
      storePartners.OPEN_MODAL_PARTNERS(true);
    };

    const dateFormat = (date: string | null = '', format = 'DD/MM/YYYY') => {
      return date ? dayjs(date).format(format) : '';
    };

    const searchPartners = async (search: string) => {
      await storePartners.REQUEST_SEARCH_PARTNERS(search);
    };

    const requestPagination = async (page: number) => {
      await storePartners.REQUEST_GET_PARTERNS({ page });
    };

    const remove = async (props: iPartners) => {
      notification.confirm(async () => {
        await storePartners.REQUEST_PARTERNS(props.id);
      });
    };

    const edit = (props: iPartners) => {
      storePartners.SET_FORM_PARTNERS({ ...props });
      openModal();
    };

    return {
      data,
      columns,
      translate,
      loading,
      pagination,
      requestPagination,
      searchPartners,
      openModal,
      remove,
      edit,
      ...toRefs(state),
    };
  },
});
</script>
