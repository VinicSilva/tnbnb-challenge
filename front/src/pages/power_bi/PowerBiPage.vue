<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <bank-breadcrumbs :breadcrumbs="listBreadcrumbs" />
      </div>
      <div class="col-12">
        <bi-table
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
          :columns="columns"
          :rows="data"
          :loading="loading"
          selection="none"
          row-key="id"
          :custom-slot="{ 'body-cell': ['actions'] }"
        >
          <template v-slot:top>
            <bi-search
              style="top: 10px"
              hidden-search
              hidden-remove
              @add="openModal"
              :disable-add="data.length > 0"
              class="relative-position"
            >
              <template #title>
                <b>Power Bi</b>
              </template>
              <template v-slot:btn-center>
                <q-btn
                  icon="mdi-api"
                  class="q-mr-xs"
                  size="sm"
                  color="brown"
                  round
                >
                  <q-tooltip>Gerar Token API</q-tooltip>
                </q-btn>
                <q-btn
                  title="Testar conexão"
                  color="green"
                  icon="mdi-connection"
                  size="sm"
                  round
                  :disabled="!data.length"
                >
                  <q-tooltip>Testar conexão</q-tooltip>
                </q-btn>
              </template>
            </bi-search>
          </template>
          <template v-slot:body-cell-actions="{ props }">
            <q-td align="center" width="100px">
              <bi-dropdown-actions @edit="edit(props)" @remove="remove(props)" />
            </q-td>
          </template>
          <template v-slot:no-data>
            <bi-no-data />
          </template>
        </bi-table>
      </div>
    </div>
    <modal-add-power-bi />
  </q-page>
</template>
<script lang="ts">
import { useTranslate } from 'src/composable/translate';
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue';
import { usePowerBiStore } from 'src/stores/power_bi/power_bi';
import ModalAddPowerBi from './components/ModalAddPowerBi.vue';
import { iPowerBiTenant } from 'src/model/powerBiModel';
import { useNotification } from 'src/composable/notification';

export default defineComponent({
  name: 'PowerBiPage',
  components: { ModalAddPowerBi },
  setup() {
    const { translate } = useTranslate();
    const { notification } = useNotification();
    const powerBiStore = usePowerBiStore();
    const state = reactive({
      listBreadcrumbs: [{ label: 'Power Bi', icon: 'mdi-chart-box' }],
    });

    onMounted(async () => {
      await powerBiStore.REQUEST_GET_ALL_POWER_BI();
    });

    const columns = computed(() => {
      return [
        {
          label: translate.value.user,
          field: 'usuario_powerbi',
          name: 'user',
          align: 'left',
        },
        {
          label: 'CLIENT ID',
          field: 'client_id_azure',
          name: 'client',
          align: 'left',
        },
        {
          label: 'CLIENT SECRET',
          field: 'client_secret_azure',
          name: 'client',
          align: 'left',
        },
        {
          label: 'DIRETORIO ID',
          field: 'diretorio_id_azure',
          name: 'directorio_id',
          align: 'center',
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
      return powerBiStore.listPowerBi.map((item) => {
        return item;
      });
    });

    const loading = computed(() => {
      return powerBiStore.loadingTable;
    });

    const openModal = () => {
      powerBiStore.OPEN_MODAL_POWER_BI(true);
    };

    const edit = (props: iPowerBiTenant) => {
      powerBiStore.SET_FORM_POWER_BI(props);
      openModal();
    };

    const remove = (props: iPowerBiTenant) => {
      notification.confirm(() => {
        powerBiStore.REQUEST_REMOVE_POWER_BI(props.id);
      });
    };

    return {
      columns,
      data,
      loading,
      remove,
      ...toRefs(state),
      openModal,
      edit,
    };
  },
});
</script>
