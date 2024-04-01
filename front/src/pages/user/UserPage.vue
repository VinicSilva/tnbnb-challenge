<template>
  <q-page>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-12">
        <pi-table
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
          :grid="true"
          :rows="dataTableUsers"
          selection="none"
        >
          <template v-slot:top>
            <pi-search
              hidden-remove
              @add="openModal"
              style="top: 10px"
              v-model="search"
              hiddenSearch
              class="relative-position"
            >
              <template #title>
                <b>{{ translate.users }}</b>
              </template>
            </pi-search>
          </template>
          <template v-slot:item="{ props }">
            <div class="col-md-3 col-xs-12 col-sm-6">
              <q-card style="padding-bottom: 10px" bordered flat :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''">
                <q-separator />
                <q-list dense>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Nome</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ props.name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Email</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ props.email }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Data de nascimento</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ props.birth_date }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label>CPF</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ props.cpf }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                  <q-item-section>
                    <q-btn color="primary" @click="editUser(props.id)">Editar</q-btn>
                  </q-item-section>
                  <q-item-section>
                    <q-btn color="negative" @click="deleteUser(props.id)">Deletar</q-btn>
                  </q-item-section>
                </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </pi-table>
      </div>
    </div>
    <modal-add-edit-user :user="propUser" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, reactive, onMounted } from 'vue';
import { useTranslate } from 'src/composable/translate';
import { useUserStore } from 'src/stores/user/user';
import ModalAddEditUser from './components/ModalAddEditUser.vue';

export default defineComponent({
  name: 'UserPage',
  components: { ModalAddEditUser },
  setup() {
    const storeUser = useUserStore();
    const state = reactive({
      search: '',
    });

    const { translate } = useTranslate();

    const listBreadcrumbs = computed(() => {
      return [{ label: translate.value.users, icon: 'fa-solid fa-users' }];
    });

    onMounted(async () => {
      await storeUser.REQUEST_GET_USERS();
    });

    const openModal = () => {
      storeUser.OPEN_MODAL_USER(true);
    };

    const dataTableUsers = computed(() => {
      return storeUser.listUsers;
    });

    const propUser = computed(() => {
      return storeUser.propUser;
    });

    const pagination = computed(() => {
      return storeUser.pagination;
    });

    const deleteUser = async (id: number) => {
      await storeUser.REQUEST_DELETE_USER(id);
    };

    const editUser = async (id: number) => {
      const propUser = storeUser.listUsers.find((user: any) => user.id === id);
      storeUser.SET_PROP_USER(propUser);
      storeUser.OPEN_MODAL_USER(true);
    };

    return {
      pagination,
      dataTableUsers,
      translate,
      listBreadcrumbs,
      propUser,
      openModal,
      deleteUser,
      editUser,
      ...toRefs(state),
    };
  },
});
</script>
