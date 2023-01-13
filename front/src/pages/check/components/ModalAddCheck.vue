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
import { useCheckStore } from 'src/stores/checks/check';
import { useRules } from 'src/composable/rules';
import { configModalTitle } from 'src/utils';

export default defineComponent({
  name: 'ModalAddCheck',
  setup() {
    const { translate } = useTranslate();
    const formRef = ref();
    const rules = useRules();
    const storeCheck = useCheckStore();
    const state = reactive({
      send: {
        description: '',
        value: '',
        image: null,
      },
    });
  
    const loading = computed(() => {
      return storeCheck.loadingModal;
    });

    const modalTitle = computed(() => {
      return configModalTitle(null, {
        edit: 'edit',
        add:  translate.value.add_check,
      });
    });

    const openModal = computed({
      get() {
        return storeCheck.openModalCheck;
      },
      set(value: boolean) {
        storeCheck.OPEN_MODAL_CHECK(value);
      },
    });

    watch(
      () => openModal.value,
      (isOpen) => {
        let formCheck: any = { ...storeCheck.$state.form };
        state.send = formCheck;
        !isOpen && reset();
      }
    );

    const reset = () => {
      formRef.value.reset();
      openModal.value = false;
      storeCheck.SET_FORM_CHECK();
    };

    const handleDomain = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          await storeCheck.REQUEST_ADD_CHECK(state.send);
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
