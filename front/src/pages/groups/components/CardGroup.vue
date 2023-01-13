<template>
  <q-card>
    <q-card-section class="bg-grey-11 no-padding">
      <div class="row q-pa-sm items-center">
        <b>{{ name }}</b>
        <q-space></q-space>
        <bi-dropdown-actions />
      </div>
    </q-card-section>
    <q-card-section class="no-padding">
      <div class="row q-pa-md items-center justify-center">
        <q-icon name="mdi-account-group" size="3em" />
      </div>
      <div class="row pa">
        <q-list class="full-width" dense>
          <q-item
            dense
            v-for="(item, index) in $attrs.sub"
            :key="index"
            class="flex justify-center full-width"
          >
            <q-btn
              size="10px"
              outline
              dense
              class="full-width flex justify-center"
              color="grey"
            >
              {{ item.name }}
            </q-btn>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardGroup',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.pa {
  padding: 0 10px 10px 10px;
}
</style>
