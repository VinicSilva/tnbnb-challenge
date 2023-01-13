<template>
  <bi-modal v-model="openModal">
    <template v-slot:title>
      <q-icon name="mdi-plus-circle" color="white" size="25px" />
      <b class="text-white q-ml-sm"> Adicionar Usuário</b>
    </template>
    <template v-slot:content>
      <q-form>
        <div class="row q-col-gutter-y-md">
          <div class="col-12">
            <q-input outlined dense :label="translate.name" v-model="send.name">
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-account"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              :label="translate.email"
              v-model="send.email"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-email"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              :label="translate.password"
              v-model="send.password"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-lock"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-4">
            <q-checkbox
              size="xs"
              v-model="send.change_password"
              label="Trocar senha"
            ></q-checkbox>
          </div>
          <div class="col-12">
            <bi-filter-component
              :disable-toggle="send.ris"
              v-model:enabled="send.filter"
              v-model:filter="send.listFilter"
            />
          </div>
          <div class="col-12">
            <bi-ris-component
              :disable-toggle="send.filter"
              v-model:enabled="send.ris"
              v-model:ris="send.listRis"
            />
          </div>
        </div>
      </q-form>
    </template>
    <template v-slot:actions>
      <bi-modal-footer @close="openModal = false"></bi-modal-footer>
    </template>
  </bi-modal>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue';
import { useUsersStore } from 'src/stores/users/user';
import { useTranslate } from 'src/composable/translate';

interface iSend {
  name: string;
  email: string;
  password: string;
  change_password: boolean;
  listFilter: any[];
  listRis: any[];
  filter: boolean;
  ris: boolean;
}

interface iState {
  send: iSend;
}

export default defineComponent({
  name: 'ModalAddGroup',
  setup() {
    const { translate } = useTranslate();
    const state: iState = reactive({
      send: {
        name: '',
        email: '',
        password: '',
        filter: false,
        listFilter: [],
        listRis: [],
        ris: false,
        change_password: false,
      },
    });

    const storeUser = useUsersStore();

    const openModal = computed({
      get() {
        return storeUser.openModalUser;
      },
      set(value: boolean) {
        storeUser.OPEN_MODAL_USER(value);
      },
    });

    return { openModal, translate, ...toRefs(state) };
  },
});
</script>
