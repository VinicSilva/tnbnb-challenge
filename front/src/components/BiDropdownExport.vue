<template>
  <q-btn-dropdown
    dense
    round
    icon="mdi-file-download-outline"
    class="bi-dropdown-export"
  >
    <q-list>
      <q-item
        v-for="(item, key) in options"
        :key="key"
        clickable
        v-close-popup
        @click="setLanguages(item.value)"
      >
        <q-item-section side>
          <q-icon :name="item.icon" :color="item.color" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BiDropdownExport',
  setup() {
    const options = computed(() => {
      return [
        {
          icon: 'mdi-file-pdf-box',
          label: 'PDF',
          color: 'red',
        },
        {
          icon: 'mdi-file-excel',
          color: 'green',
          label: 'Excel',
        },
      ];
    });

    return { options };
  },
});
</script>
<style lang="scss">
.bi-dropdown-export {
  border-radius: 50px;
  .q-btn-dropdown__arrow {
    display: none $i;
  }
}
</style>
