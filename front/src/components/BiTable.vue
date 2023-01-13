<template>
  <q-table
    hide-pagination
    :pagination="{ rowsPerPage: 10 }"
    class="bi-table no-shadow"
    :selection="selection"
    v-model:selected="modelSelected"
    v-bind="$attrs"
  >
    <slot />
    <template #header v-if="existSlot(Object.keys($slots), 'header')">
      <slot name="header" />
    </template>
    <template #top v-if="existSlot(Object.keys($slots), 'top')">
      <slot name="top" />
    </template>
    <template #bottom v-if="existSlot(Object.keys($slots), 'bottom')">
      <slot name="bottom" />
    </template>
    <template #item="{ row }" v-if="existSlot(Object.keys($slots), 'item')">
      <slot name="item" :props="row" />
    </template>
    <template #no-data v-if="existSlot(Object.keys($slots), 'no-data')">
      <slot name="no-data" />
    </template>
    <template #loading v-if="existSlot(Object.keys($slots), 'loading')">
      <slot name="item" />
    </template>
    <template v-for="item in listBody" v-slot:[item]="{ row }">
      <slot :name="item" :props="row" />
    </template>
    <template v-for="item in listHeader" v-slot:[item]="{ row }">
      <slot :name="item" :props="row" />
    </template>
  </q-table>
</template>
<script lang="ts">
import { defineComponent, computed, WritableComputedRef } from 'vue';

export default defineComponent({
  name: 'BiTable',
  emits: ['update:selected'],
  props: {
    selection: {
      type: String,
      default: 'multiple',
    },
    selected: {
      type: Array,
      default: () => [],
    },
    customSlot: {
      type: Object,
      default: () => {
        return {
          'body-cell': [],
          'header-cell': [],
          default: [],
        };
      },
    },
  },
  setup(props, { emit }) {
    const modelSelected = computed({
      get() {
        return props.selected;
      },
      set(value: []) {
        emit('update:selected', value);
      },
    });

    const listHeader: WritableComputedRef<string[]> = computed(() => {
      if (props.customSlot['header-cell']) {
        return props.customSlot['header-cell'].map((item: string) => {
          return `header-cell-${item}`;
        });
      }
      return [];
    });

    const listBody: WritableComputedRef<string[]> = computed(() => {
      if (props.customSlot['body-cell']) {
        return props.customSlot['body-cell'].map((item: string) => {
          return `body-cell-${item}`;
        });
      }
      return [];
    });

    const existSlot = (slot: string[], search = '') => {
      return !!slot.filter((item) => item === search).length;
    };

    return { listHeader, listBody, modelSelected, existSlot };
  },
});
</script>

<style lang="scss">
.bi-table {
  .q-table__bottom {
    min-height: 35px;
  }
}
</style>
