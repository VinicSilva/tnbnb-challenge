<template>
  <q-list bordered class="rounded-borders">
    <q-item tag="label" dense v-ripple class="q-pa-xs bg-grey-3 text-black">
      <q-item-section>
        <q-toggle
          size="sm"
          :color="toggleColors"
          v-model="modelEnabled"
          keep-color
          :val="modelEnabled"
          true-value="S"
          false-value="N"
          :disable="disableToggle === 'S'"
          checked-icon="mdi-check"
          unchecked-icon="clear"
          label="Utilizar filtro"
        />
      </q-item-section>
    </q-item>
    <div v-if="modelEnabled === 'S'" class="full-width q-pa-md">
      <fieldset>
        <legend>
          <q-btn
            label="Adicionar filtro"
            icon="mdi-plus"
            size="sm"
            @click="addFilter"
            unelevated
            color="grey"
          ></q-btn>
        </legend>
        <div class="row">
          <q-list>
            <q-item
              v-for="(item, index) in modelFilter"
              :key="index"
              class="q-pa-xs"
            >
              <div class="row q-col-gutter-sm">
                <div class="col-4">
                  <q-input
                    outlined
                    v-model="modelFilter[index].filtro_tabela"
                    dense
                    :rules="rules.table"
                    :label="translate.table"
                  />
                </div>
                <div class="col-4">
                  <q-input
                    outlined
                    v-model="modelFilter[index].filtro_coluna"
                    dense
                    :rules="rules.column"
                    :label="translate.column"
                  />
                </div>
                <div class="col-3">
                  <q-input
                    outlined
                    v-model="modelFilter[index].filtro_valor"
                    dense
                    :rules="rules.value"
                    :label="translate.value"
                  />
                </div>
                <div class="col-1">
                  <q-btn
                    icon="mdi-trash-can"
                    unelevated
                    color="red"
                    :disable="!index"
                    @click="removeFilter(index)"
                    round
                    class="q-mt-xs"
                    size="sm"
                  ></q-btn>
                </div>
              </div>
            </q-item>
          </q-list>
        </div>
      </fieldset>
    </div>
  </q-list>
</template>
<script lang="ts">
import { useRules } from 'src/composable/rules';
import { useTranslate } from 'src/composable/translate';
import { defineComponent, watch, computed } from 'vue';

export default defineComponent({
  name: 'BiFilterComponent',
  emits: ['update:enabled', 'update:filter', , 'update:type'],
  props: {
    filter: {
      type: Array,
      default: () => [],
    },
    enabled: {
      type: String,
      default: 'N',
    },
    disableToggle: {
      type: String,
      default: 'N',
    },
  },
  setup(props, { emit }) {
    const { translate } = useTranslate();
    const rules = useRules();
    watch(
      () => props.enabled,
      (value) => {
        const val = [
          {
            filtro_tabela: '',
            filtro_coluna: '',
            filtro_valor: '',
          },
        ];
        const valueInitial = value === 'S' ? val : [];
        modelFilter.value = [...valueInitial];
      }
    );
    const modelEnabled = computed({
      get() {
        return props.enabled;
      },
      set(value: string) {
        const type = value === 'S' ? 'filtro' : '';
        emit('update:enabled', value);
        emit('update:type', type);
      },
    });

    const modelFilter = computed({
      get() {
        return props.filter;
      },
      set(value) {
        emit('update:filter', value);
      },
    });

    const toggleColors = computed(() => {
      return modelEnabled.value === 'S' ? 'green' : 'red';
    });

    const addFilter = () => {
      modelFilter.value = [
        ...modelFilter.value,
        {
          filtro_tabela: '',
          filtro_coluna: '',
          filtro_valor: '',
        },
      ];
    };

    const removeFilter = (index: number) => {
      modelFilter.value.splice(index, 1);
      modelFilter.value = [...modelFilter.value];
    };

    return {
      toggleColors,
      modelEnabled,
      modelFilter,
      rules,
      translate,
      addFilter,
      removeFilter,
    };
  },
});
</script>
