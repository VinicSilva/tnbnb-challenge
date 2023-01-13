<template>
  <div class="row full-width justify-center items-center">
    <q-pagination
      color="grey-8"
      class="bi-pagination"
      v-bind="$attrs"
      v-model="model"
      direction-links
      boundary-links
      unelevated
      flat
      :max-pages="maxPages"
      :max="pagination.totalPage"
      icon-first="mdi-chevron-double-left"
      icon-last="mdi-chevron-double-right"
      icon-prev="mdi-chevron-left"
      icon-next="mdi-chevron-right"
    ></q-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BiPagination',
  emits: ['request', 'update:modelValue'],
  props: {
    maxPages: {
      type: Number,
      default: 5,
    },
    modelValue: {
      type: Number,
      default: 5,
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          totalPage: 1,
        };
      },
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value: number) {
        emit('update:modelValue', value);
        emit('request', value);
      },
    });

    return { model };
  },
});
</script>
<style lang="scss">
.bi-pagination {
  .q-btn--actionable {
    border-radius: 50px;
  }
}
</style>
