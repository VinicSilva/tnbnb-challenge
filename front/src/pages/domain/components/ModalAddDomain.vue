<template>
  <bi-modal
    v-model="openModal"
    :loading="loading"
  >
    <template v-slot:title>
      <q-icon :name="modalTitle.icon" color="white" size="25px" />
      <b class="text-white q-ml-sm"> {{ modalTitle.text }} </b>
    </template>
    <template v-slot:content>
      <q-form @submit.prevent="handleDomain" ref="formRef">
        <div class="row q-col-gutter-y-sm">
          <div class="col-12">
            <q-input
              outlined
              dense
              hide-bottom-space
              :rules="rules.subdomain"
              :label="translate.subdomain"
              v-model="send.subdominio"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-heart" size="14px"></q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </q-form>
    </template>
    <template v-slot:actions>
      <bi-modal-footer
        @save="handleDomain"
        @close="openModal = false"
      ></bi-modal-footer>
    </template>
  </bi-modal>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs, ref, watch } from 'vue';
import { useTranslate } from 'src/composable/translate';
import { useDomainStore } from 'src/stores/domain/domain';
import { useRules } from 'src/composable/rules';
import { configModalTitle } from 'src/utils';

export default defineComponent({
  name: 'ModalAddDomain',
  setup() {
    const { translate } = useTranslate();
    const formRef = ref();
    const rules = useRules();
    const storeDomain = useDomainStore();
    const state = reactive({
      send: {},
    });

    const loading = computed(() => {
      return storeDomain.loadingModal;
    });

    const modalTitle = computed(() => {
      return configModalTitle(state.send.id, {
        edit: 'Editar dominio',
        add: 'Adicionar dominio',
      });
    });

    const openModal = computed({
      get() {
        return storeDomain.openModalDomain;
      },
      set(value: boolean) {
        storeDomain.OPEN_MODAL_DOMAIN(value);
      },
    });

    watch(
      () => openModal.value,
      (isOpen) => {
        state.send = { ...storeDomain.$state.form };
        !isOpen && reset();
      }
    );

    const reset = () => {
      formRef.value.reset();
      openModal.value = false;
      storeDomain.SET_FORM_DOMAIN();
    };

    const handleDomain = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          await storeDomain.REQUEST_ADD_OR_UPDATE_DOMAIN(state.send);
          reset();
        }
      });
    };

    return {
      openModal,
      translate,
      rules,
      loading,
      formRef,
      modalTitle,
      ...toRefs(state),
      handleDomain,
    };
  },
});
</script>
