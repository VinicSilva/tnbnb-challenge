<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <bank-breadcrumbs :breadcrumbs="listBreadcrumbs" />
      </div>
      <div class="col-12">
        <bi-table
          card-container-class="q-pa-md q-col-gutter-x-md q-col-gutter-y-sm"
          :grid="gridGroup"
          :columns="columns"
          :rows="dataTableGroup"
          row-key="id"
          v-model:selected="selected"
          :custom-slot="{ 'body-cell': ['actions', 'sub'] }"
        >
          <template v-slot:top>
            <bi-search
              style="top: 10px"
              v-model="search"
              :disable-remove="!selected.length"
              @add="openModal"
              class="relative-position"
            >
              <template #title>
                <b>{{ translate.groups }}</b>
              </template>
              <template #btn-center>
                <div class="col-auto">
                  <q-btn
                    :icon="btnGroupGrid.icon"
                    :title="btnGroupGrid.title"
                    @click="toggleTableGroup"
                    round
                    size="sm"
                  />
                </div>
              </template>
            </bi-search>
          </template>
          <template v-slot:body-cell-actions>
            <q-td align="center" style="width: 80px">
              <bi-dropdown-actions />
            </q-td>
          </template>
          <template v-slot:body-cell-sub="{ props }">
            <q-td align="center">
              <q-badge v-theme-menu-header>{{ props.sub.length }}</q-badge>
            </q-td>
          </template>
          <template v-slot:item="{ props }">
            <div class="col-md-3 col-xs-12 col-sm-3">
              <card-group v-bind="props" />
            </div>
          </template>
          <template v-slot:bottom>
            <bi-pagination />
          </template>
        </bi-table>
      </div>
    </div>
    <modal-add-group />
  </q-page>
</template>
<script>
import { useTranslate } from 'src/composable/translate';
import { useGroupsStore } from 'src/stores/groups/groups';
import { isBtnGrid } from 'src/utils';
import { defineComponent, reactive, toRefs, computed } from 'vue';
import CardGroup from './components/CardGroup.vue';
import ModalAddGroup from './components/ModalAddGroup.vue';

export default defineComponent({
  name: 'GroupPage',
  components: { CardGroup, ModalAddGroup },
  setup() {
    const storeGroups = useGroupsStore();
    const { translate } = useTranslate();

    const state = reactive({
      gridGroup: false,
      search: '',
      selected: [],
      listBreadcrumbs: [
        { label: translate.value.groups, icon: 'mdi-account-group' },
        { label: translate.value.list.toLocaleLowerCase() },
      ],
    });

    const columns = computed(() => {
      return [
        {
          label: translate.value.name,
          field: 'name',
          name: 'name',
          align: 'left',
        },
        {
          label: translate.value.subgroups,
          field: 'sub',
          name: 'sub',
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

    const dataTableGroup = computed(() => {
      return storeGroups.listGroups;
    });

    const btnGroupGrid = computed(() => {
      return isBtnGrid(state.gridGroup);
    });

    const openModal = () => {
      storeGroups.OPEN_MODAL_GROUPS(true);
    };

    const toggleTableGroup = () => {
      state.gridGroup = !state.gridGroup;
    };

    return {
      translate,
      dataTableGroup,
      btnGroupGrid,
      columns,
      openModal,
      toggleTableGroup,
      ...toRefs(state),
    };
  },
});
</script>
