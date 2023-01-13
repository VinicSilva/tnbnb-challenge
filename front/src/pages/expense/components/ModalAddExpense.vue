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
            <q-input
              outlined
              dense
              hide-bottom-space
              :rules="rules.purchase_date"
              :label="translate.purchase_date"
              v-model="send.purchase_date"
              mask="####-##-##"
              reverse-fill-mask
              hint="Mask: YYYY-MM-DD"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-calendar" size="14px"></q-icon>
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
import { computed, defineComponent, reactive, toRefs, ref, watch, onMounted } from 'vue';
import { useTranslate } from 'src/composable/translate';
import { useBalanceStore } from 'src/stores/balance/balance';
import { useExpenseStore } from 'src/stores/expenses/expense';
import { useRules } from 'src/composable/rules';
import { configModalTitle } from 'src/utils';
import { useNotification } from 'src/composable/notification';


export default defineComponent({
  name: 'ModalAddExpense',
  setup() {
    const { notification } = useNotification();
    const { translate } = useTranslate();
    const formRef = ref();
    const rules = useRules();
    const storeExpense = useExpenseStore();
    const storeBalance = useBalanceStore();
    const state = reactive({
      balance: 0,
      send: {
        description: '',
        value: '',
        purchase_date: '',
      },
    });

    onMounted(async () => {
      await storeBalance.REQUEST_GET_BALANCE();
    });

    const loading = computed(() => {
      return storeExpense.loadingModal;
    });

    const modalTitle = computed(() => {
      return configModalTitle(null, {
        edit: 'edit',
        add: translate.value.register_purchase,
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
        let formattedBalancePrice: number = storeBalance.balance.balance / 100
        if (state.send.value > formattedBalancePrice) {
          notification.error({
            caption: translate.value.insufficient_balance
          });
          return;
        }
        if (success) {
          await storeExpense.REQUEST_ADD_PURCHASE(state.send);
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
