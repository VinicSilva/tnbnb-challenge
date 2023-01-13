<template>
  <q-select
    v-model="model"
    outlined
    dense
    :label="translate.subdomain"
    map-options
    emit-value
    v-bind="$attrs"
    :options="domainOptions"
  ></q-select>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  WritableComputedRef,
} from 'vue';
import { useTranslate } from 'src/composable/translate';

export default defineComponent({
  name: 'BiSelectSubdomain',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [Number, String],
      default: null,
    },
  },
  setup(props, { emit }) {
    const { translate } = useTranslate();
    const state = reactive({
      listDomain: [],
    });

    const model: WritableComputedRef<number> = computed({
      get() {
        return props.modelValue;
      },
      set(value: number) {
        emit('update:modelValue', value);
      },
    });

    const domainOptions = computed(() => {
      return state.listDomain.map((item) => {
        return {
          label: item.subdominio,
          value: item.id,
        };
      });
    });

    return { model, domainOptions, translate };
  },
});
</script>
