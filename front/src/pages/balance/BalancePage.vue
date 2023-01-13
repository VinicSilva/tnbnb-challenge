<template>
  <q-page>
    <div class="row">
      <bank-breadcrumbs :breadcrumbs="listBreadcrumbs" />
    </div>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div
        class="col-md-4 col-xs-12 col-sm-6"
        v-for="(card, key) in listCardBalance"
        :key="key"
      >
        <card-dashboard v-bind="card" />
      </div>

      <div class="col-12">
        <bank-table
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
          :grid="true"
          :rows="dataTableTransactions"
          selection="none"
        >
          <template v-slot:top>
            <bank-search
              hidden-add
              hidden-remove
              style="top: 10px"
              v-model="search"
              hiddenSearch
              class="relative-position"
            >
              <template #title>
                <b>{{ translate.transactions }}</b>
              </template>
            </bank-search>
          </template>
          <template v-slot:item="{ props }">
            <div class="col-md-3 col-xs-12 col-sm-6">
              <card-transaction v-bind="props" />
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
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, reactive, onMounted } from 'vue';
import CardDashboard from './components/CardDashboard.vue';
import { useTranslate } from 'src/composable/translate';
import { useBalanceStore } from 'src/stores/balance/balance';
import { useTransactionStore } from 'src/stores/transaction/transaction';
import CardTransaction from './components/CardTransaction.vue';
import { useAuth } from 'src/composable/auth';
import dayjs from 'dayjs';
import { formatPrice } from 'src/utils';

export default defineComponent({
  name: 'Balance',
  components: { CardDashboard, CardTransaction },
  setup() {
    const { getLanguage } = useAuth();
    const storeBalance = useBalanceStore();
    const storeTransaction = useTransactionStore();
    const state = reactive({
      search: '',
    });

    const { translate } = useTranslate();

    const listBreadcrumbs = computed(() => {
      return [{ label: translate.value.balance, icon: 'fa-solid fa-balance-scale' }];
    });

    onMounted(async () => {
      Promise.all([
        storeBalance.REQUEST_GET_BALANCE(),
        storeTransaction.REQUEST_GET_TRANSACTIONS(),
      ])
    });

    const pagination = computed(() => {
      return storeTransaction.pagination;
    });

    const listCardBalance = computed(() => {
      return [
        {
          icon: 'mdi-wallet',
          text: translate.value.balance,
          value: formatPrice(storeBalance.balance.balance, getLanguage()),
          color: '#5064B5',
        },
        {
          icon: 'mdi-arrow-top-right',
          text: translate.value.income,
          value: formatPrice(storeBalance.balance.income_value, getLanguage()),
          color: '#949767',
        },
        {
          icon: 'mdi-arrow-bottom-left',
          text: translate.value.expense,
          value: formatPrice(storeBalance.balance.expense_value, getLanguage()),
          color: '#EA4B64',
        },
      ];
    });

    const requestPagination = async (page: number) => {
      await storeTransaction.REQUEST_GET_TRANSACTIONS({ page });
    };

    const dataTableTransactions = computed(() => {
      return storeTransaction.listTransactions.map((item) => {
        return {
          theme: {
            icon: item.type === 'income' ? 'mdi-arrow-top-right' : 'mdi-arrow-bottom-left',
            color_section: item.type === 'income' ? 'bg-green-11 q-pa-sm' : 'bg-red-11 q-pa-sm',
            color_text: item.type === 'income' ? 'text-green transaction-name ellipsis' : 'text-red transaction-name ellipsis',
          },
          date: dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss') ,
          description:
            item.type === 'income'
              ? item.check?.description
              : item.purchase?.description,
          value: formatPrice(
            item.type === 'income' ? item.value : item.value * -1,
            getLanguage()
          ),
          checkId: item.id,
        };
      });
    });

    return {
      pagination,
      listCardBalance,
      requestPagination,
      dataTableTransactions,
      translate,
      listBreadcrumbs,
      ...toRefs(state),
    };
  },
});
</script>
