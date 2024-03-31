<template>
  <q-page>
    <div class="row">
      <pi-breadcrumbs :breadcrumbs="listBreadcrumbs" />
    </div>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-12">
        <bank-table
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
          :columns="columns"
          :rows="data"
          :loading="loading"
          :grid="false"
          :custom-slot="{ 'body-cell': ['actions', 'limit', 'image'] }"
          selection="none"
          row-key="id"
        >
          <template v-slot:top>
            <template>
              <b>{{ translate.users }}</b>
            </template>
          </template>
          <template v-slot:body-cell-image="{ props }">
            <q-td width="200px">
              <q-btn flat round size="sm" icon="mdi-image">
                <q-tooltip>
                  <img :src="props.image" style="height: 200px;width: 200px;" />
                </q-tooltip>
              </q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="{ props }">
            <q-td align="center" style="width: 150px;">
              <q-btn class="q-mr-md" color="red" :label="btn_label_reject" @click="rejectCheck(props)"></q-btn>
              <q-btn :label="btn_label_accept"  color="green" @click="acceptCheck(props)"></q-btn>
            </q-td>
          </template>
          <template v-slot:no-data>
            <bank-no-data />
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
import { useAdminStore } from 'src/stores/admin/admin';
import { useTranslate } from 'src/composable/translate';
import { useAuth } from 'src/composable/auth';
import { formatPrice } from 'src/utils';

export default defineComponent({
  name: 'BankCheck',
  components: { },
  setup() {
    const { getLanguage } = useAuth();
    const storeAdmin = useAdminStore();
    const { translate } = useTranslate();
    
    const state = reactive({
      search: '',
      btn_label_accept: translate.value.accept,
      btn_label_reject: translate.value.reject,
      selected: [],
    });

    onMounted(async () => {
      await storeAdmin.REQUEST_GET_BANK_PENDING_CHECKS();
    });

    const pagination = computed(() => {
      return storeAdmin.pagination;
    });

    const loading = computed(() => {
      return storeAdmin.loadingTable;
    });


    const listBreadcrumbs = computed(() => {
      return [{ label: translate.value.admin_bank_checks, icon: 'fa-solid fa-bank' }];
    });

    const columns = computed(() => {
      return [
        {
          label: translate.value.id,
          field: 'checkId',
          name: 'checkId',
          align: 'left',
        },  
        {
          label: translate.value.name,
          field: 'username',
          name: 'username',
          align: 'left',
        },
        {
          label: translate.value.email,
          field: 'email',
          name: 'email',
          align: 'left',
        },
        {
          label: translate.value.value,
          field: 'value',
          name: 'value',
          align: 'center',
        },
        {
          label: translate.value.bank_check_image,
          field: 'image',
          name: 'image',
          align: 'left',
        },
        {
          label: translate.value.actions,
          field: 'actions',
          name: 'actions',
          align: 'center',
        },
      ];
    });

    const data = computed(() => {
      return storeAdmin.listPendingChecks?.map((item) => {
        return {
          username: item.user.username,
          email: item.user.email,
          value: formatPrice(item.value, getLanguage()),
          checkId: item.id,
          image: `${process.env.BASE_API_URL}/storage/${item.image}`
        };
      });
    });

    const requestPagination = async (page: number) => {
      await storeAdmin.REQUEST_GET_BANK_PENDING_CHECKS({ page });
    };

    const acceptCheck = async (props: any) => {
      await storeAdmin.REQUEST_CHANGE_STATUS_BANK_CHECK(props.checkId, 'accepted');
    };

    const rejectCheck = async (props: any) => {
      await storeAdmin.REQUEST_CHANGE_STATUS_BANK_CHECK(props.checkId, 'rejected');
    };

    return {
      translate,
      pagination,
      requestPagination,
      acceptCheck,
      rejectCheck,
      data,
      columns,
      loading,
      listBreadcrumbs,
      ...toRefs(state),
    };
  },
});
</script>
