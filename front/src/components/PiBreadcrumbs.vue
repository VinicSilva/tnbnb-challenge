<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      v-for="(item, index) in breadcrumbs"
      v-bind="item"
      :key="index"
    />
  </q-breadcrumbs>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Breadcrumbs',
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },
});
</script>
