<template>
  <bi-modal v-model="openModal">
    <template v-slot:title>
      <q-icon name="mdi-plus-circle" color="white" size="25px" />
      <b class="text-white q-ml-sm"> Adicionar departamento</b>
    </template>
    <template v-slot:content>
      <q-form>
        <div class="row q-col-gutter-y-sm">
          <div class="col-12">
            <q-input
              outlined
              dense
              :placeholder="translate.name"
              v-model="send.name"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-card-account-details"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <bi-filter-component
              v-model:enabled="send.filter"
              v-model:filter="send.listFilter"
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
import { useDepartmentStore } from 'src/stores/department';
import { useTranslate } from 'src/composable/translate';

interface iSend {
  name: string;
  filter: boolean;
  listFilter: any[];
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
        filter: false,
        listFilter: [],
      },
    });

    const storeDepartment = useDepartmentStore();

    const openModal = computed({
      get() {
        return storeDepartment.openModalDepartment;
      },
      set(value: boolean) {
        storeDepartment.OPEN_MODAL_DEPARTMENT(value);
      },
    });

    return { openModal, translate, ...toRefs(state) };
  },
});
</script>
