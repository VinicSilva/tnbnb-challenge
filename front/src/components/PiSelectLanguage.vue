<template>
  <q-select
    outlined
    dense
    v-model="model"
    emit-value
    map-options
    class="pi-select-language"
    :rules="rules"
    :options="options"
  >
    <template v-slot:prepend>
      <div class="flag-position">
        <pi-country-flag :country="flagSelected" />
      </div>
    </template>
    <template v-slot:option="scope">
      <q-item dense v-bind="scope.itemProps">
        <q-item-section side>
          <pi-country-flag :country="scope.opt.flag" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script>
import { defineComponent, reactive, toRefs, computed } from 'vue';

export default defineComponent({
  name: 'PiSelectLanguage',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      options: [
        { flag: 'br', value: 'pt-BR', label: 'Português' },
        { flag: 'us', value: 'en-US', label: 'Inglês' },
        { flag: 'es', value: 'es', label: 'Espanhol' },
      ],
    });

    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    const flagSelected = computed(() => {
      const result = state.options.find((item) => item.value === model.value);
      return result.flag;
    });

    return { ...toRefs(state), model, flagSelected };
  },
});
</script>
<style lang="scss" scoped>
.pi-select-language {
  .flag-position {
    margin-bottom: 6px;
    margin-right: 10px;
  }
}
</style>
