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
                        :rows="dataTableChecks"
                        selection="none"
                      >
                        <template v-slot:top>
                        </template>
                        <template v-slot:item="{ props }">
                          <div class="col-md-3 col-xs-12 col-sm-6">
                            <card-check v-bind="props" />
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
    
    <modal-add-check />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, reactive, onMounted, watch } from 'vue';
import { useTranslate } from 'src/composable/translate';
import { useCheckStore } from 'src/stores/checks/check';
import CardCheck from './components/CardCheck.vue';
import { useAuth } from 'src/composable/auth';
import dayjs from 'dayjs';
import { formatPrice } from 'src/utils';
import ModalAddCheck from './components/ModalAddCheck.vue';

export default defineComponent({
  name: 'Check',
  components: { CardCheck, ModalAddCheck },
  setup() {
    const { getLanguage } = useAuth();
    const { translate } = useTranslate();
    const storeCheck = useCheckStore();
    const state = reactive({
      tab: translate.value.pending,
      tabs: [translate.value.pending, translate.value.accepted, translate.value.rejected],
      search: '',
    });

    watch(
      () => state.tab,
      async (tabItem) => {
        await storeCheck.REQUEST_GET_CHECKS({ status: tabItem });
      }
    );    

    const listBreadcrumbs = computed(() => {
      return [{ label: translate.value.check, icon: 'mdi-credit-card-scan' }];
    });

    onMounted(async () => {
      // setar como pending a request 
      await storeCheck.REQUEST_GET_CHECKS({ status: 'Pending' });
    });

    const openModal = () => {
      storeCheck.OPEN_MODAL_CHECK(true);
    };

    const dataTableChecks = computed(() => {
      return storeCheck.listChecks.map((item: any) => {
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
      return storeCheck.pagination;
    });

    const requestPagination = async (page: number) => {
      await storeCheck.REQUEST_GET_CHECKS({ page, status: state.tab });
    };

    return {
      pagination,
      requestPagination,
      dataTableChecks,
      translate,
      listBreadcrumbs,
      openModal,
      ...toRefs(state),
    };
  },
});
</script>
