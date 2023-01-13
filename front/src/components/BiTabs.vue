<template>
  <div class="row">
    <template v-if="vertical">
      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <q-tabs v-bind="$attrs" :vertical="vertical" v-model="model">
            <q-tab v-bind="tab" v-for="(tab, key) in tabs" :key="key"></q-tab>
          </q-tabs>
        </template>
        <template v-slot:after>
          <q-tab-panels v-model="model" animated class="full-height">
            <q-tab-panel
              v-for="(tab, key) in tabs"
              :name="tab.name"
              :key="key"
            >
              <slot name="all" />
              <slot :name="tab.name" :props="tab" />
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </template>
    <template v-else>
      <q-tabs v-bind="$attrs" v-model="model">
        <q-tab v-bind="tab" v-for="(tab, key) in tabs" :key="key"></q-tab>
      </q-tabs>
      <q-tab-panels v-model="model" animated class="full-height">
        <q-tab-panel
          v-for="(tab, key) in tabs"
          :name="tab.name"
          :key="key"
        >
          <slot name="all" />
          <slot :name="tab.name" :props="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

interface iTabs {
  name: string;
  attrs: any;
  [key: string]: any;
}

export default defineComponent({
  name: 'BiTabs',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    tabs: {
      type: Array as () => PropType<iTabs>,
      default: () => {
        return [];
      },
    },
    sizeSplitter: {
      type: Number,
      default: 20,
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value: string) {
        emit('update:modelValue', value);
      },
    });

    const splitterModel = computed(() => {
      return props.sizeSplitter;
    });

    return { model, splitterModel };
  },
});
</script>
