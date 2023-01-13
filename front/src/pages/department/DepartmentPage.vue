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
          :custom-slot="{ 'body-cell': ['actions'] }"
          v-model:selected="selected"
          row-key="id"
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
                <b>{{ translate.department }}</b>
              </template>
            </bi-search>
          </template>
          <template v-slot:body-cell-actions="{ props }">
            <q-td width="100px" align="center">
              <bi-dropdown-actions
                @remove="remove(props)"
                @edit="edit(props)"
              />
            </q-td>
          </template>
          <template v-slot:bottom>
            <bi-pagination />
          </template>
        </bi-table>
      </div>
    </div>
    <modal-add-department />
  </q-page>
</template>
<script>
import { useDepartmentStore } from 'src/stores/department';
import { useTranslate } from 'src/composable/translate';
import { defineComponent, reactive, toRefs, computed } from 'vue';
import ModalAddDepartment from './components/ModalAddDepartment.vue';

export default defineComponent({
  name: 'DepartmentPage',
  components: { ModalAddDepartment },
  setup() {
    const { translate } = useTranslate();
    const storeDepartment = useDepartmentStore();
    const state = reactive({
      selected: [],
      search: '',
      listBreadcrumbs: [
        { label: translate.value.department, icon: 'mdi-card-account-details' },
        { label: translate.value.list.toLocaleLowerCase() },
      ],
    });

    const columns = computed(() => {
      return [
        {
          name: 'name',
          field: 'name',
          label: translate.value.name,
          align: 'left',
        },
        {
          name: 'actions',
          field: 'actions',
          label: translate.value.actions,
          align: 'center',
        },
      ];
    });

    const data = computed(() => {
      return storeDepartment.listDeprtment;
    });

    const openModal = () => {
      storeDepartment.OPEN_MODAL_DEPARTMENT(true);
    };

    const edit = () => {
      console.log('edit');
    };

    const remove = () => {
      console.log('remove');
    };

    return {
      ...toRefs(state),
      data,
      translate,
      openModal,
      columns,
      edit,
      remove,
    };
  },
});
</script>
