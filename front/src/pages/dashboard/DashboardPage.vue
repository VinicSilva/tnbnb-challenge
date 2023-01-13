<template>
  <q-page>
    <div class="row">
      <bank-breadcrumbs :breadcrumbs="listBreadcrumbs" />
    </div>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div
        class="col-md-3 col-xs-12 col-sm-6"
        v-for="(card, key) in listCardDashboard"
        :key="key"
      >
        <card-dashboard v-bind="card" />
      </div>

      <div class="col-12">
        <bi-table
          :grid="gridTableReports"
          :rows="dataTableReports"
          selection="none"
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
        >
          <template v-slot:top>
            <bi-search
              hidden-add
              hidden-remove
              style="top: 10px"
              v-model="search"
              class="relative-position"
            >
              <template #title>
                <b>Últimos relatório adicionados</b>
              </template>
              <template #btn-after-add>
                <div class="col-auto">
                  <q-btn
                    :icon="btnReportsGrid.icon"
                    :title="btnReportsGrid.title"
                    round
                    size="sm"
                    @click="toggleTableReports"
                  />
                </div>
              </template>
            </bi-search>
          </template>
          <template v-slot:item="{ props }">
            <div class="col-md-2 col-sm-3 col-xs-12">
              <bi-reports-card
                :date="props.date"
                :name="props.name"
                :active="props.favorite"
              />
            </div>
          </template>
          <template v-slot:bottom>
            <bi-pagination />
          </template>
        </bi-table>
      </div>

      <div class="col-12">
        <bi-table
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
          :grid="gridTableusers"
          :rows="dataTableUsers"
          selection="none"
        >
          <template v-slot:top>
            <bi-search
              hidden-add
              hidden-remove
              style="top: 10px"
              v-model="search"
              class="relative-position"
            >
              <template #title>
                <b>{{ translate.users }}</b>
              </template>
              <template #btn-after-add>
                <div class="col-auto">
                  <bi-dropdown-export />
                </div>
                <div class="col-auto">
                  <q-btn
                    :icon="btnUsersGrid.icon"
                    :title="btnUsersGrid.title"
                    @click="toggleTableUsers"
                    round
                    size="sm"
                  />
                </div>
              </template>
            </bi-search>
          </template>
          <template v-slot:item="{ props }">
            <div class="col-md-3 col-xs-12 col-sm-6">
              <card-user v-bind="props" />
            </div>
          </template>
          <template v-slot:bottom>
            <bi-pagination />
          </template>
        </bi-table>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, reactive } from 'vue';
import CardDashboard from './components/CardDashboard.vue';
import { useTranslate } from 'src/composable/translate';
import { isBtnGrid } from 'src/utils';
import CardUser from './components/CardUser.vue';

export default defineComponent({
  name: 'Dashboard',
  components: { CardDashboard, CardUser },
  setup() {
    const state = reactive({
      search: '',
      gridTableReports: true,
      gridTableusers: true,
    });

    const { translate } = useTranslate();

    const listBreadcrumbs = computed(() => {
      return [{ label: translate.value.dashboard, icon: 'fa-solid fa-gauge' }];
    });

    const listCardDashboard = computed(() => {
      return [
        {
          icon: 'mdi-office-building',
          text: translate.value.companies,
          value: 100,
          color: '#5064B5',
        },
        {
          icon: 'mdi-account',
          text: translate.value.users,
          value: 100,
          color: '#1E88E5',
        },
        {
          icon: 'mdi-account-group',
          text: translate.value.groups,
          value: 100,
          color: '#A270B1',
        },
        {
          icon: 'mdi-file-chart',
          text: 'Relatórios adicionados',
          value: 100,
          color: '#EA4B64',
        },
      ];
    });

    const dataTableUsers = computed(() => {
      return [
        {
          email: 'mb@gmail.com',
          name: 'Michael',
          date: '24/03/2022 19:00',
          id: 1,
        },
        {
          email: 'jose@gmail.com',
          name: 'José',
          date: '24/03/2022 19:10',
          id: 2,
        },
        {
          email: 'pedro@gmail.com',
          name: 'Pedro',
          date: '24/03/2022 19:12',
          id: 3,
        },
        {
          email: 'maria@gmail.com',
          name: 'Maria',
          date: '24/03/2022 19:14',
          id: 4,
        },
      ];
    });

    const dataTableReports = computed(() => {
      return [
        {
          name: 'Dashboard financeiro',
          date: '26/10/2022',
          favorite: false,
          id: 11,
        },
        {
          name: 'Financeiro',
          date: '26/10/2022',
          favorite: true,
          id: 10,
        },
        {
          name: 'Comercial',
          date: '26/10/2022',
          favorite: true,
          id: 4,
        },
        {
          name: 'Suporte',
          date: '26/10/2022',
          favorite: false,
          id: 7,
        },
        {
          name: 'Diretoria',
          date: '26/10/2022',
          favorite: true,
          id: 8,
        },
        {
          name: 'Suporte',
          date: '26/10/2022',
          favorite: true,
          id: 19,
        },
      ];
    });

    const btnReportsGrid = computed(() => {
      return isBtnGrid(state.gridTableReports);
    });

    const btnUsersGrid = computed(() => {
      return isBtnGrid(state.gridTableReports);
    });

    const toggleTableReports = () => {
      state.gridTableReports = !state.gridTableReports;
    };
    const toggleTableUsers = () => {
      state.gridTableusers = !state.gridTableusers;
    };

    return {
      listCardDashboard,
      dataTableUsers,
      dataTableReports,
      translate,
      listBreadcrumbs,
      btnReportsGrid,
      btnUsersGrid,
      ...toRefs(state),
      toggleTableReports,
      toggleTableUsers,
    };
  },
});
</script>
