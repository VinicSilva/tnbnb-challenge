<template>
  <q-page class="row items-center justify-evenly">
    <transaction-component
      title="TRANSACTIONS"
      :columns="columns"
      :rows="rows"
    ></transaction-component>
  </q-page>
</template>

<script lang="ts">
import TransactionComponent from 'src/components/customer/TransactionComponent.vue';
import { defineComponent } from 'vue';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Product',
    field: 'name',
    align: 'left',
  },
  {
    name: 'value',
    align: 'center',
    label: 'Cost',
    field: 'value',
  },
  { name: 'createDate', label: 'Created Date', field: 'registerDate' },
];

const rows = [
  {
    name: 'Frozen Yogurt',
    value: 15,
    registerDate: '11/12/2022, 7:25 PM',
  },
  {
    name: 't-shirt',
    value: -159,
    registerDate: '10/25/2022, 7:25 PM',
  },
  {
    name: 'Jacket',
    value: -20.49,
    registerDate: '08/18/2022, 2:12 PM',
  },
  {
    name: 'Frozen Yogurt',
    value: 159,
    registerDate: '08/13/2022, 12:25 PM',
  },
];

export default defineComponent({
  name: 'IndexPage',
  components: { TransactionComponent },
  setup() {
    return { columns, rows };
  },
});
</script>
