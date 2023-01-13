<template>
  <q-card class="card-transaction" flat>
    <q-card-section :class="theme.color_section">
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
        <q-icon size="50px" :class="theme.color_text" :name="theme.icon" />
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
  name: 'CardTransaction',
  props: {
    description: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    theme: {
      type: Object,
      default: () => {
        ''
      },
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