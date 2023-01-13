<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <bank-breadcrumbs :breadcrumbs="listBreadcrumbs" />
      </div>
      <div class="col-12">
        <bi-table
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
          :rows="data"
          :loading="loading"
          :grid="true"
        >
          <template v-slot:top>
            <bi-search
              style="top: 10px"
              v-model="search"
              :disable-remove="!selected.length"
              @add="openModal"
              @search="searchUsers"
              class="relative-position"
            >
              <template #title>
                <b>{{ translate.users }}</b>
              </template>
            </bi-search>
          </template>
          <template v-slot:item="{ props }">
            <div class="col-md-3 col-sm-4 col-xs-12">
              <bi-card-user
                @remove="remove(props)"
                @edit="edit(props)"
                :email="props.email"
                :type="props.perfil_usuario"
                :name="props.nome_usuario"
                :status="props.situacao_usuario"
              >
              </bi-card-user>
            </div>
          </template>
          <template v-slot:no-data>
            <bi-no-data />
          </template>
          <template v-slot:bottom>
            <bi-pagination
              :pagination="pagination"
              v-model="pagination.current_page"
              @request="requestPagination"
            />
          </template>
        </bi-table>
      </div>
    </div>
    <modal-add-user />
  </q-page>
</template>
<script lang="ts">
import { useTranslate } from 'src/composable/translate';
import { useUsersStore } from 'src/stores/users/user';
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue';
import { configStatus, configProfileUser } from 'src/utils';
import ModalAddUser from './components/ModalAddUser.vue';
import { iUser } from 'src/model/userModel';

export default defineComponent({
  name: 'UserPage',
  components: { ModalAddUser },
  setup() {
    const { translate } = useTranslate();
    const storeUser = useUsersStore();
    const state = reactive({
      selected: [],
      search: '',
      listBreadcrumbs: [
        { label: translate.value.users, icon: 'mdi-account' },
        { label: translate.value.list.toLocaleLowerCase() },
      ],
    });

    onMounted(async () => {
      await storeUser.REQUEST_GET_ALL_USERS();
    });

    const columns = computed(() => {
      return [
        {
          label: translate.value.name,
          field: 'nome_usuario',
          name: 'nome_usuario',
          align: 'left',
        },
        {
          label: translate.value.email,
          field: 'email',
          name: 'email',
          align: 'left',
        },
        {
          label: 'Tipo',
          field: 'perfil_usuario',
          name: 'type',
          align: 'center',
        },
        {
          label: 'Status',
          field: 'situacao_usuario',
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
      return storeUser.listUsers.map((item) => {
        return {
          nome_usuario: item.nome_usuario,
          email: item.email,
          perfil_usuario: configProfileUser(item.type),
          situacao_usuario: configStatus(item.situacao_usuario),
        };
      });
    });

    const openModal = () => {
      storeUser.OPEN_MODAL_USER(true);
    };

    const pagination = computed(() => {
      return storeUser.pagination;
    });

    const loading = computed(() => {
      return storeUser.loadingTable;
    });

    const searchUsers = async (search: string) => {
      await storeUser.REQUEST_SEARCH_USER({ search });
    };

    const requestPagination = async (page: number) => {
      await storeUser.REQUEST_GET_ALL_USERS({ page });
    };

    const remove = (props: iUser) => {
      console.log('remove', props);
    };

    const edit = (props: iUser) => {
      console.log('edit', props);
    };

    return {
      data,
      columns,
      translate,
      pagination,
      loading,
      openModal,
      remove,
      edit,
      requestPagination,
      searchUsers,
      ...toRefs(state),
    };
  },
});
</script>
