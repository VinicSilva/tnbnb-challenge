<template>
  <bank-modal
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
              :rules="rules.description"
              :label="translate.description"
              v-model="send.description"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-lead-pencil" size="14px"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              hide-bottom-space
              :rules="rules.value"
              :label="translate.value"
              v-model="send.value"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
            >
              <template v-slot:prepend>
                <q-icon name="mdi-cash-usd" size="14px"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-file
              style="max-width: 300px"
              v-model="send.image"
              filled
              rounded
              label="Restricted to images"
              accept=".jpg, image/*"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-file" size="14px"></q-icon>
              </template>
            </q-file>
          </div>
        </div>
      </q-form>
    </template>
    <template v-slot:actions>
      <bank-modal-footer
        @save="handleDomain"
        @close="openModal = false"
      ></bank-modal-footer>
    </template>
  </bank-modal>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs, ref, watch } from 'vue';
import { useTranslate } from 'src/composable/translate';
import { useBankCheckStore } from 'src/stores/bank_checks/bank_check';
import { useRules } from 'src/composable/rules';
import { configModalTitle } from 'src/utils';

export default defineComponent({
  name: 'ModalAddCheck',
  setup() {
    const { translate } = useTranslate();
    const formRef = ref();
    const rules = useRules();
    const storeBankCheck = useBankCheckStore();
    const state = reactive({
      send: {
        description: '',
        value: '',
        image: null,
      },
    });
  
    const loading = computed(() => {
      return storeBankCheck.loadingModal;
    });

    const modalTitle = computed(() => {
      return configModalTitle(null, {
        edit: 'edit',
        add:  translate.value.add_bank_check,
      });
    });

    const openModal = computed({
      get() {
        return storeBankCheck.openModalBankCheck;
      },
      set(value: boolean) {
        storeBankCheck.OPEN_MODAL_BANK_CHECK(value);
      },
    });

    watch(
      () => openModal.value,
      (isOpen) => {
        let formCheck: any = { ...storeBankCheck.$state.form };
        state.send = formCheck;
        !isOpen && reset();
      }
    );

    const reset = () => {
      formRef.value.reset();
      openModal.value = false;
      storeBankCheck.SET_FORM_BANK_CHECK();
    };

    const handleDomain = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          await storeBankCheck.REQUEST_ADD_BANK_CHECK(state.send);
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
