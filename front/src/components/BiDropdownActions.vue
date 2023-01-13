<template>
  <q-btn-dropdown
    dense
    round
    size="sm"
    flat
    v-bind="$attrs"
    icon="mdi-dots-vertical"
    class="bi-dropdown-actions"
  >
    <q-list>
      <slot name="btn-before-edit" />
      <q-item
        dense
        v-if="!hiddenEdit"
        :disable="disableEdit"
        @click="$emit('edit')"
        clickable
        v-close-popup
      >
        <q-item-section side>
          <q-icon name="mdi-pencil" size="16px" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ translate.to_edit }}</q-item-label>
        </q-item-section>
      </q-item>
      <slot name="btn-center" />
      <q-item
        dense
        v-if="!hiddenRemove"
        :disable="disableRemove"
        @click="$emit('remove')"
        clickable
        v-close-popup
      >
        <q-item-section side>
          <q-icon name="mdi-trash-can" size="16px" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ translate.to_remove }}</q-item-label>
        </q-item-section>
      </q-item>
      <slot name="btn-after-edit" />
    </q-list>
  </q-btn-dropdown>
</template>
<script>
import { useTranslate } from 'src/composable/translate';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BiDropdownActions',
  props: {
    hiddenRemove: {
      type: Boolean,
      default: false,
    },
    disableRemove: {
      type: Boolean,
      default: false,
    },
    hiddenEdit: {
      type: Boolean,
      default: false,
    },
    disableEdit: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { translate } = useTranslate();
    const options = computed(() => {
      return [
        {
          icon: 'mdi-pencil',
          label: 'Editar',
        },
        {},
      ];
    });

    return { options, translate };
  },
});
</script>
<style lang="scss">
.bi-dropdown-actions {
  border-radius: 50px;
  .q-btn-dropdown__arrow {
    display: none $i;
  }
}
</style>
