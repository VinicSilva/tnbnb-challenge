<template>
  <bi-modal v-model="openModal">
    <template v-slot:title>
      <q-icon name="mdi-plus-circle" color="white" size="25px" />
      <b class="text-white q-ml-sm"> Adicionar grupo</b>
    </template>
    <template v-slot:content>
      <q-form>
        <div class="row">
          <div class="col-6">
            <q-input outlined dense :label="translate.name" v-model="send.name">
              <template v-slot:prepend>
                <q-icon name="mdi-account-group"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-1">
            <q-btn
              icon="mdi-plus"
              round
              @click="addSubgroups"
              size="sm"
              color="grey"
              class="q-mt-xs q-ml-sm"
              unelevated
            />
          </div>
        </div>
        <div class="row q-mt-sm" v-if="send.subgroups.length">
          <fieldset class="full-width">
            <legend>{{ translate.subgroups }}</legend>
            <div class="row q-col-gutter-y-md">
              <div
                class="col-12"
                v-for="(item, index) in send.subgroups"
                :key="index"
              >
                <div class="row q-col-gutter-x-sm">
                  <div class="col-11">
                    <q-input
                      v-model="send.subgroups[index].name"
                      outlined
                      dense
                      :label="translate.name"
                    >
                    </q-input>
                  </div>
                  <div class="col-1 flex items-center">
                    <q-btn
                      icon="mdi-trash-can"
                      color="red"
                      @click="removeSubgroups(index)"
                      size="sm"
                      unelevated
                      round
                    />
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
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
import { useGroupsStore } from 'src/stores/groups/groups';
import { useTranslate } from 'src/composable/translate';

interface iSubgroups {
  name: string;
}
interface iSend {
  name: string;
  subgroups: iSubgroups[];
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
        subgroups: [],
      },
    });

    const storeGroups = useGroupsStore();

    const openModal = computed({
      get() {
        return storeGroups.openModalGroups;
      },
      set(value: boolean) {
        storeGroups.OPEN_MODAL_GROUPS(value);
      },
    });

    const addSubgroups = () => {
      state.send.subgroups?.push({ name: '' });
    };

    const removeSubgroups = (index: number) => {
      state.send.subgroups.splice(index, 1);
    };

    return {
      openModal,
      translate,
      ...toRefs(state),
      addSubgroups,
      removeSubgroups,
    };
  },
});
</script>
