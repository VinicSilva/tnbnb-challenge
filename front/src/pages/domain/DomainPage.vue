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
          row-key="id"
          :loading="loadingTable"
          v-model:selected="selected"
          :custom-slot="{ 'body-cell': ['actions'] }"
        >
          <template v-slot:top>
            <bi-search
              style="top: 10px"
              v-model="search"
              :disable-remove="!selected.length"
              @add="openModal"
              @search="searchDomain"
              class="relative-position"
            >
              <template #title>
                <b>{{ translate.domain }}</b>
              </template>
            </bi-search>
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
              @request="updatePagination"
              :pagination="pagination"
            />
          </template>
        </bi-table>
      </div>
    </div>
    <modal-add-domain />
  </q-page>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue';
import { useTranslate } from 'src/composable/translate';
import { useDomainStore } from 'src/stores/domain/domain';
import ModalAddDomain from './components/ModalAddDomain.vue';
import { iDomain } from 'src/model/domainModel';
import { useNotification } from 'src/composable/notification';
export default defineComponent({
  name: 'DomainPage',
  components: { ModalAddDomain },
  setup() {
    const { translate } = useTranslate();
    const storeDomain = useDomainStore();
    const { notification } = useNotification();
    const state = reactive({
      selected: [],
      search: '',
      listBreadcrumbs: [
        { label: translate.value.domain, icon: 'mdi-heart' },
        { label: translate.value.list.toLocaleLowerCase() },
      ],
    });

    onMounted(async () => {
      await storeDomain.REQUEST_GET_DOMAIN();
    });

    const pagination = computed(() => {
      return storeDomain.pagination;
    });

    const loadingTable = computed(() => {
      return storeDomain.loadingTable;
    });

    const columns = computed(() => {
      return [
        {
          label: translate.value.subdomain,
          field: 'subdominio',
          name: 'subdominio',
          align: 'left',
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
      return storeDomain.listDomain.map((item) => {
        return {
          ...item,
        };
      });
    });

    const openModal = () => {
      storeDomain.OPEN_MODAL_DOMAIN(true);
    };

    const remove = (props: iDomain) => {
      notification.confirm(async () => {
        await storeDomain.REQUEST_DELETE_DOMAIN(props.id);
      });
    };

    const edit = (data: iDomain) => {
      storeDomain.SET_FORM_DOMAIN(data);
      openModal();
    };

    const searchDomain = async (search: string) => {
      await storeDomain.REQUEST_SEARCH_DOMAIN({ subdominio: search });
    };

    const updatePagination = async (page: number) => {
      await storeDomain.REQUEST_GET_DOMAIN({ page });
    };

    return {
      data,
      columns,
      translate,
      pagination,
      loadingTable,
      searchDomain,
      openModal,
      remove,
      edit,
      updatePagination,
      ...toRefs(state),
    };
  },
});
</script>
