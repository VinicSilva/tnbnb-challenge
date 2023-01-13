<template>
  <q-list bordered class="rounded-borders">
    <q-item tag="label" dense v-ripple class="q-pa-xs bg-grey-3 text-black">
      <q-item-section>
        <q-toggle
          size="sm"
          :color="toggleColors"
          :disable="disableToggle === 'S'"
          v-model="modelEnabled"
          keep-color
          true-value="S"
          false-value="N"
          checked-icon="mdi-check"
          unchecked-icon="clear"
          label="Utilizar ris"
        />
      </q-item-section>
    </q-item>
    <div class="full-width q-pa-md" v-if="modelEnabled === 'S'">
      <fieldset>
        <legend>
          <q-btn label="rls" size="sm" unelevated color="grey"></q-btn>
        </legend>
        <div class="row">
          <q-list>
            <q-item
              v-for="(item, index) in modelRis"
              :key="index"
              class="q-pa-xs"
            >
              <div class="row q-col-gutter-sm">
                <div class="col-6">
                  <q-input
                    outlined
                    v-model="modelRis[index].regra_rls"
                    :rules="rules.rules"
                    dense
                    label="Regra RLS"
                  />
                </div>
                <div class="col-6">
                  <q-input
                    outlined
                    :rules="rules.username"
                    v-model="modelRis[index].parametro_rls"
                    dense
                    label="Username RLS"
                  />
                </div>
              </div>
            </q-item>
          </q-list>
          <!-- -->
        </div>
      </fieldset>
    </div>
  </q-list>
</template>
<script lang="ts">
import { useRules } from 'src/composable/rules';
import { useTranslate } from 'src/composable/translate';
import { defineComponent, computed, watch } from 'vue';

export default defineComponent({
  name: 'BiFilterComponent',
  emits: ['update:enabled', 'update:ris', 'update:type'],
  props: {
    enabled: {
      type: String,
      default: 'N',
    },
    ris: {
      type: Array,
      default: () => [],
    },
    disableToggle: {
      type: String,
      default: 'N',
    },
  },
  setup(props, { emit }) {
    const rules = useRules();
    watch(
      () => props.enabled,
      (value) => {
        const val = [
          {
            regra_rls: '',
            parametro_rls: '',
          },
        ];
        const valueInitial = value === 'S' ? val : [];
        modelRis.value = [...valueInitial];
      }
    );

    const modelEnabled = computed({
      get() {
        return props.enabled;
      },
      set(value: string) {
        const type = value === 'S' ? 'rls' : '';
        emit('update:enabled', value);
        emit('update:type', type);
      },
    });

    const modelRis = computed({
      get() {
        return props.ris;
      },
      set(value) {
        emit('update:ris', value);
      },
    });

    const toggleColors = computed(() => {
      return modelEnabled.value === 'S' ? 'green' : 'red';
    });

    const addFilter = () => {
      modelRis.value = [
        ...modelRis.value,
        {
          regra_rls: '',
          parametro_rls: '',
        },
      ];
    };

    return {
      toggleColors,
      modelEnabled,
      modelRis,
      rules,
      addFilter,
    };
  },
});
</script>
