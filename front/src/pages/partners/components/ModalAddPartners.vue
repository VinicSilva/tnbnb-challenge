<template>
  <bi-modal v-model="openModal" :loading="loading">
    <template #title>
      <q-icon :name="modalTitle.icon" color="white" size="25px" />
      <b class="text-white q-ml-sm"> {{ modalTitle.text }}</b>
    </template>
    <template #content>
      <q-form @submit.prevent="handlePartners" ref="formRef">
        <div class="row q-col-gutter-y-xs q-col-gutter-x-md">
          <div class="col-12">
            <q-input
              outlined
              v-model="send.nome_parceiro"
              dense
              :rules="rules.name"
              :label="translate.name"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-account"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              v-model="send.email"
              type="email"
              :rules="rules.email"
              :label="translate.email"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-email" size="14px" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              :class="{ 'q-mb-md': send.id }"
              :rules="send.id ? [] : rules.password"
              :label="translate.password"
              v-model="send.password"
              :type="inputText ? 'text' : 'password'"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  @click="inputText = !inputText"
                  size="14px"
                  :name="inputText ? 'mdi-eye-off' : 'mdi-eye'"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </div>
          <div class="col-6">
            <bi-select-subdomain
              :rules="rules.subdomain"
              v-model="send.subdominio_id"
              :hide-bottom-space="!isPeriod"
            />
          </div>
          <div class="col-6">
            <q-select
              :label="translate.situation"
              v-model="send.situacao_parceiro"
              outlined
              :rules="rules.situation"
              dense
              :hide-bottom-space="!isPeriod"
              map-options
              emit-value
              :options="situationOptions"
            ></q-select>
          </div>
          <div class="col-12" v-if="isPeriod">
            <bi-date
              label="Data"
              hide-bottom-space
              :rules="rules.name"
              v-model="send.data_validate_teste"
            />
          </div>
        </div>
      </q-form>
    </template>
    <template #actions>
      <bi-modal-footer @save="handlePartners" />
    </template>
  </bi-modal>
</template>
<script lang="ts">
import { useRules } from 'src/composable/rules';
import { useTranslate } from 'src/composable/translate';
import { usePartnersStore } from 'src/stores/partners/partners';
import { configModalTitle } from 'src/utils';
import { defineComponent, reactive, toRefs, computed, ref, watch } from 'vue';
export default defineComponent({
  name: 'ModalAddPartners',
  setup() {
    const storagePartners = usePartnersStore();
    const { translate } = useTranslate();
    const rules = useRules();
    const formRef = ref();
    const state = reactive({
      inputText: false,
      situationOptions: [
        { label: translate.value.active, value: 'A' },
        { label: translate.value.blocked, value: 'B' },
        { label: 'Período de teste', value: 'T' },
        { label: translate.value.inactive, value: 'I' },
      ],
      send: {},
    });

    const modalTitle = computed(() => {
      return configModalTitle(state.send.id, {
        edit: 'Editar parceiro',
        add: 'Adicionar parceiro',
      });
    });

    const isPeriod = computed(() => {
      return state.send.situacao_parceiro == 'T';
    });

    const loading = computed(() => {
      return storagePartners.loadingModal;
    });

    const openModal = computed({
      get() {
        return storagePartners.openModalPartners;
      },
      set(value: boolean) {
        storagePartners.OPEN_MODAL_PARTNERS(value);
      },
    });

    watch(
      () => openModal.value,
      (isOpen) => {
        state.send = { ...storagePartners.$state.form };
        !isOpen && reset();
      }
    );

    const reset = () => {
      formRef.value.reset();
      openModal.value = false;
      storagePartners.SET_FORM_PARTNERS();
    };

    const handlePartners = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          await storagePartners.REQUEST_ADD_OR_UPDATE_PARTERNS(state.send);
          reset();
        }
      });
    };

    return {
      openModal,
      translate,
      rules,
      modalTitle,
      loading,
      formRef,
      isPeriod,
      ...toRefs(state),
      handlePartners,
    };
  },
});
</script>
