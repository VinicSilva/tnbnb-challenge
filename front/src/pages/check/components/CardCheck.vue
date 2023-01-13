<template>
  <q-card class="card-transaction" flat>
    <q-card-section class="bg-green-11 q-pa-sm">
      <div class="row justify-center items-center">
        <b
          class="ellipsis text-center transaction-name"
          :title="description"
          v-text="description"
        ></b>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-sm q-mb-sm">
      <div class="row items-center justify-center">
        <img :src="image" style="height: 80px; width: 100px" class="text-red transaction-name ellipsis" name="mdi-arrow-top-right" />
      </div>
      <div class="row">
        <div class="col-12">
          <div class="flex items-center justify-center q-mb-xs">
            <b class="text-grey transaction-name ellipsis">{{ value }}</b>
          </div>
          <div class="flex items-center justify-center">
            <q-badge color="grey">
              <q-icon name="mdi-clock-outline" />
              <span class="q-ml-sm">{{ date }}</span>
            </q-badge>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardCheck',
  props: {
    description: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.card-transaction {
  border-radius: 4px $i;
  border: 1px solid #e4e4e4;
  .transaction-name {
    max-width: 70px;
  }
}
</style>