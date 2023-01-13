<template>
  <q-page>
    <div class="row">
      <bank-breadcrumbs :breadcrumbs="listBreadcrumbs" />
    </div>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col text-right">
        <q-btn push color="primary" round icon="mdi-note-plus-outline" @click="openModal" />
      </div>
    </div>
    
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-12">
        <div class="q-pa-md">
          <div class="q-gutter-y-md">
            <q-card>
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab
                  v-for="(tabName, index) in tabs"
                  :key="index"
                  :name="tabName"
                  :label="tabName"
                />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel
                  v-for="(tabContent, index) in tabs"
                  :key="index"
                  :name="tabContent"
                >
                  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
                    <div class="col-12">
                      <bank-table
                        card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
                        :grid="true"
                        :rows="dataTableBankChecks"
                        selection="none"
                      >
                        <template v-slot:top>
                        </template>
                        <template v-slot:item="{ props }">
                          <div class="col-md-3 col-xs-12 col-sm-6">
                            <card-bank-check v-bind="props" />
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
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    
    <modal-add-bank-check />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, reactive, onMounted, watch } from 'vue';
import { useTranslate } from 'src/composable/translate';
import { useBankCheckStore } from 'src/stores/bank_checks/bank_check';
import CardBankCheck from './components/CardBankCheck.vue';
import { useAuth } from 'src/composable/auth';
import dayjs from 'dayjs';
import { formatPrice } from 'src/utils';
import ModalAddBankCheck from './components/ModalAddBankCheck.vue';

export default defineComponent({
  name: 'BankCheck',
  components: { CardBankCheck, ModalAddBankCheck },
  setup() {
    const { getLanguage } = useAuth();
    const { translate } = useTranslate();
    const storeBankCheck = useBankCheckStore();
    const state = reactive({
      tab: translate.value.pending,
      tabs: [translate.value.pending, translate.value.accepted, translate.value.rejected],
      search: '',
    });

    watch(
      () => state.tab,
      async (tabItem) => {
        await storeBankCheck.REQUEST_GET_BANK_CHECKS({ status: tabItem });
      }
    );    

    const listBreadcrumbs = computed(() => {
      return [{ label: translate.value.bank_checks, icon: 'mdi-credit-card-scan' }];
    });

    onMounted(async () => {
      await storeBankCheck.REQUEST_GET_BANK_CHECKS({ status: 'Pending' });
    });

    const openModal = () => {
      storeBankCheck.OPEN_MODAL_BANK_CHECK(true);
    };

    const dataTableBankChecks = computed(() => {
      return storeBankCheck.listBankChecks?.map((item: any) => {
        return {
          date: dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss'),
          description: item.description,
          value: formatPrice(item.value, getLanguage()),
          image: `${process.env.BASE_API_URL}/storage/${item.image}`,
          expenseId: item.id,
        };
      });
    });

    const pagination = computed(() => {
      return storeBankCheck.pagination;
    });

    const requestPagination = async (page: number) => {
      await storeBankCheck.REQUEST_GET_BANK_CHECKS({ page, status: state.tab });
    };

    return {
      pagination,
      requestPagination,
      dataTableBankChecks,
      translate,
      listBreadcrumbs,
      openModal,
      ...toRefs(state),
    };
  },
});
</script>
