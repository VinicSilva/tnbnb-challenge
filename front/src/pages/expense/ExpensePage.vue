<template>
  <q-page>
    <div class="row">
      <bank-breadcrumbs :breadcrumbs="listBreadcrumbs" />
    </div>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-12">
        <bank-table
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
          :grid="true"
          :rows="dataTableExpenses"
          selection="none"
        >
          <template v-slot:top>
            <bank-search
              hidden-remove
              @add="openModal"
              style="top: 10px"
              v-model="search"
              hiddenSearch
              class="relative-position"
            >
              <template #title>
                <b>{{ translate.expense }}</b>
              </template>
            </bank-search>
          </template>
          <template v-slot:item="{ props }">
            <div class="col-md-3 col-xs-12 col-sm-6">
              <card-expense v-bind="props" />
            </div>
          </template>
          <template v-slot:bottom>
            <bank-pagination 
            :pagination="pagination"
            v-model="pagination.current_page"
            @request="requestPagination"
            />
          </template>
        </bank-table>
      </div>
    </div>
    <modal-add-expense />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, reactive, onMounted } from 'vue';
import { useTranslate } from 'src/composable/translate';
import { useExpenseStore } from 'src/stores/expenses/expense';
import CardExpense from './components/CardExpense.vue';
import { useAuth } from 'src/composable/auth';
import dayjs from 'dayjs';
import { formatPrice } from 'src/utils';
import ModalAddExpense from './components/ModalAddExpense.vue';

export default defineComponent({
  name: 'Expense',
  components: { CardExpense, ModalAddExpense },
  setup() {
    const { getLanguage } = useAuth();
    const storeExpense = useExpenseStore();
    const state = reactive({
      search: '',
    });

    const { translate } = useTranslate();

    const listBreadcrumbs = computed(() => {
      return [{ label: translate.value.expense, icon: 'mdi-arrow-bottom-left' }];
    });

    onMounted(async () => {
      await storeExpense.REQUEST_GET_EXPENSES();
    });

    const openModal = () => {
      storeExpense.OPEN_MODAL_EXPENSE(true);
    };

    const dataTableExpenses = computed(() => {
      return storeExpense.listExpenses?.map((item) => {
        return {
          date: dayjs(item.purchase_date).format('YYYY-MM-DD') ,
          description: item.description,
          value: formatPrice(
            item.value, getLanguage()
          ),
          expenseId: item.id,
        };
      });
    });

    const pagination = computed(() => {
      return storeExpense.pagination;
    });

    const requestPagination = async (page: number) => {
      await storeExpense.REQUEST_GET_EXPENSES({ page });
    };

    return {
      pagination,
      requestPagination,
      dataTableExpenses,
      translate,
      listBreadcrumbs,
      openModal,
      ...toRefs(state),
    };
  },
});
</script>
