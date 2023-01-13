<template>
  <q-card flat class="bi-card-reports">
    <q-card-section>
      <div class="absolute-right q-mt-xs q-mr-xs">
        <q-btn flat round size="xs" @click="$emit('favorite')">
          <q-icon
            :color="active ? 'yellow-10' : 'grey'"
            :name="active ? 'mdi-star' : 'mdi-star-outline'"
          />
        </q-btn>
      </div>
      <div class="row">
        <div class="full-width flex items-center justify-center">
          <q-icon size="40px" color="grey" name="mdi-file-chart" />
        </div>
        <div class="full-width flex items-center justify-center">
          <b class="name ellipsis" :title="name">{{ name }}</b>
          <q-badge color="grey">{{ date }}</q-badge>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BiReportsCard',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.bi-card-reports {
  border: 1px solid #0000001f;
  .name {
    width: 100%;
    color: #4c4c4c;
    display: block;
    text-align: center;
    font-weight: 400;
    line-height: 25px;
  }
}
</style>
