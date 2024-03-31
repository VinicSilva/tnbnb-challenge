<template>
  <q-btn-dropdown
    dense
    flat
    round
    unelevated
    :dropdown-icon="undefined"
    content-class="no-border-radius no-shadow"
    content-style="border:1px solid #e4e4e4"
    class="q-mr-sm bank-language no-border-radius"
  >
    <template v-slot:label>
      <div>
        <pi-country-flag :country="countryActive" />
      </div>
    </template>
    <q-list dense separator>
      <q-item
        v-for="(item, key) in options"
        :key="key"
        clickable
        class="q-pa-none"
        separator
        v-close-popup
        @click="setLanguages(item.value)"
      >
        <div class="flex items-center">
          <pi-country-flag :country="item.flag" class="no-margin" />
          <b>{{ item.label }}</b>
        </div>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, toRefs, onMounted } from 'vue';

import { useTranslate } from 'src/composable/translate';

export default defineComponent({
  name: 'BankSelectLanguage',
  setup() {
    const state = reactive({
      lang: '',
    });

    const { changeLanguage, getLocale } = useTranslate();

    onMounted(() => {
      state.lang = getLocale();
    });

    const options = computed(() => {
      return [
        { flag: 'br', value: 'pt-BR', label: 'Português' },
        { flag: 'us', value: 'en-US', label: 'Inglês' },
        { flag: 'es', value: 'es', label: 'Espanhol' },
      ];
    });

    const countryActive = computed(() => {
      const result = options.value.find((item) => item.value === state.lang);
      return result?.flag ?? '';
    });

    const setLanguages = (lang: string) => {
      state.lang = lang;
      changeLanguage(lang);
    };

    return { options, countryActive, ...toRefs(state), setLanguages };
  },
});
</script>

<style lang="scss">
.bank-language {
  height: 55px;
  .q-btn-dropdown__arrow {
    margin-left: 0 $i;
  }
}
</style>
