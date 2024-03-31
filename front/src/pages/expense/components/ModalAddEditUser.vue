<template>
  <pi-modal v-model="openModal" :loading="loading">
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
              :rules="rules.name"
              type="text"
              v-model="send.name"
              :label="translate.name"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-account" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              :rules="rules.email"
              type="text"
              v-model="send.email"
              :label="translate.email"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-email" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              :rules="rules.birth_date"
              type="date"
              v-model="send.birth_date"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-email" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              :rules="rules.cpf"
              type="text"
              v-model="send.cpf"
              :label="translate.cpf"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-email" />
              </template>
            </q-input>
          </div>
        </div>
      </q-form>
    </template>
    <template v-slot:actions>
      <pi-modal-footer
        @save="handleDomain"
        @close="openModal = false"
      ></pi-modal-footer>
    </template>
  </pi-modal>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  ref,
  watch,
  onMounted,
} from 'vue';
import { useTranslate } from 'src/composable/translate';
import { useExpenseStore } from 'src/stores/expenses/expense';
import { useRules } from 'src/composable/rules';
import { configModalTitle } from 'src/utils';
import { useNotification } from 'src/composable/notification';
import { useAuth } from 'src/composable/auth';

export default defineComponent({
  name: 'ModalAddEditUser',
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: any, { emit }) {
    const { getLanguage } = useAuth();
    const { notification } = useNotification();
    const { translate } = useTranslate();
    const formRef = ref();
    const rules = useRules();
    const storeExpense = useExpenseStore();
    const state = reactive({
      balance: 0,
      send: {
        id: null,
        name: '',
        email: '',
        birth_date: '',
        cpf: '',
        type: 'customer',
        language: getLanguage(),
      },
    });

    watch(() => props.user, (newUser) => {
      if (newUser) {
        state.send = { ...newUser };
      }
    }, { deep: true });

    onMounted(() => {
      if (props.user) {
        state.send = { ...props.user };
      }
    });

    const loading = computed(() => {
      return storeExpense.loadingModal;
    });

    const modalTitle = computed(() => {
      return configModalTitle(null, {
        edit: 'edit',
        add: translate.value.register_user,
      });
    });

    const openModal = computed({
      get() {
        return storeExpense.openModalExpense;
      },
      set(value: boolean) {
        storeExpense.OPEN_MODAL_EXPENSE(value);
      },
    });

    watch(
      () => openModal.value,
      (isOpen) => {
        let formPurchase: any = { ...storeExpense.$state.form };
        state.send = formPurchase;
        !isOpen && reset();
      }
    );

    const reset = () => {
      formRef.value.reset();
      openModal.value = false;
      storeExpense.SET_FORM_EXPENSE();
    };

    const handleDomain = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          if (state.send.id) {
            await storeExpense.REQUEST_UPDATE_USER(state.send);
          } else {
            await storeExpense.REQUEST_ADD_USER(state.send);
          }
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
