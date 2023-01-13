<template>
  <q-card class="q-pa-sm no-shadow card-user">
    <q-item>
      <q-item-section avatar>
        <q-avatar v-theme-menu-header size="50px" class="text-white">
          {{ name.slice(0, 1) }}
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <div class="absolute-right">
          <bi-dropdown-actions
            @remove="$emit('remove')"
            @edit="$emit('edit')"
          />
        </div>
        <q-item-label class="ellipsis name text-bold">
          <q-icon
            class="q-mr-xs cursor-pointer"
            name="mdi-circle"
            :color="status.color"
            tooltip="teste"
          >
            <q-tooltip> Situação do usuário: {{ status.label }} </q-tooltip>
          </q-icon>
          {{ name }}
        </q-item-label>
        <q-item-label caption>
          <q-icon class="q-mr-xs" name="mdi-account" />
          <strong>{{ type }}</strong>
        </q-item-label>
        <q-item-label caption class="ellipsis">
          <q-icon class="q-mr-xs" name="mdi-email" />
          {{ email }}
        </q-item-label>
        <q-item-label caption v-if="date">
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
  name: 'BiCardUser',
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
    type: {
      type: String,
      default: '',
    },
    status: {
      type: Object,
      default: () => {
        return {
          color: '',
          label: '',
        };
      },
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
