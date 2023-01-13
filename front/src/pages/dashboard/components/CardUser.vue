<template>
  <q-card class="q-pa-sm no-shadow card-user">
    <q-item>
      <q-item-section avatar>
        <q-avatar color="blue" size="50px" class="text-white">
          {{ name.slice(0, 1) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="ellipsis name">{{ name }}</q-item-label>
        <q-item-label caption class="ellipsis">
          <q-icon class="q-mr-xs" name="mdi-email" />
          {{ email }}
        </q-item-label>
        <q-item-label caption>
          <q-icon class="q-mr-xs" name="mdi-calendar-clock-outline" />
          {{ date }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardUser',
  props: {
    name: {
      type: String,
      default: '',
    },
    email: {
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

<style scoped lang="scss">
.card-user {
  border: 1px solid #0000001f;
  .name {
    color: #4c4c4c;
  }
}
</style>
