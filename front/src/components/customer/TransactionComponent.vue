<template>
  <div class="q-pa-md">
    <q-table
      title="TRANSACTIONS"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransactionComponent',
  props: {
    title: {
      type: String,
      required: false,
    },
    rows: {
      type: Array,
      required: false,
    },
    columns: {
      required: false,
    },
  },
  setup() {
    return {};
  },
});
</script>
