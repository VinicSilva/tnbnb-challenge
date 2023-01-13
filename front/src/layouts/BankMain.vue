<template>
  <q-layout :view="layout">
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BankMain',
  props: {
    layout: {
      type: String,
      default: 'hHh lpR lFr',
    },
  },
});
</script>
