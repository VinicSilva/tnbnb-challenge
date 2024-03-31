<template>
  <q-dialog v-bind="$attrs" :persistent="true" v-model="model">
    <q-card class="pi-modal" :style="{ ...modalStyle, width }">
      <template v-if="loading">
        <div
          class="row full-width loading-color full-height absolute justify-center items-center"
        >
          <q-spinner v-theme-loading size="3em" />
        </div>
      </template>

      <q-card-section v-if="!hiddenTitle" class="q-pa-sm" v-theme-modal>
        <div class="row items-center">
          <slot name="title" />
          <q-space></q-space>
          <q-btn
            icon="mdi-close"
            @click="model = false"
            round
            size="sm"
            flat
            color="white"
          />
        </div>
      </q-card-section>
      <q-card-section class="content" :style="modalStyleContent">
        <slot name="content" />
      </q-card-section>
      <q-card-actions v-if="!hiddenActions" class="bg-grey-2">
        <slot name="actions" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'PiModal',
  props: {
    hiddenTitle: {
      type: Boolean,
      default: false,
    },
    hiddenActions: {
      type: Boolean,
      default: false,
    },
    modalStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    modalContent: {
      type: Object,
      default: () => {
        return {};
      },
    },
    persistent: {
      type: Boolean,
      default: true,
    },
    height: {
      type: String,
      default: '70vh',
    },
    width: {
      type: String,
      default: '450px',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const modalStyleContent = computed(() => {
      return { ...props.modalContent, 'max-height': props.height };
    });

    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    return { model, modalStyleContent };
  },
});
</script>

<style lang="scss" scoped>
.pi-modal {
  .content {
    overflow-y: auto;
  }
  .loading-color {
    background: #fff7f77a;
    z-index: 1;
  }
}
</style>
