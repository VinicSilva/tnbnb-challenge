<template>
  <div class="row full-width">
    <q-btn
      :label="translate.close"
      @click="$emit('close')"
      color="white"
      class="text-black"
    />
    <q-space></q-space>
    <q-btn
      :label="translate.to_save"
      @click="$emit('save')"
      class="text-white"
      v-theme-button
    />
  </div>
</template>
<script>
import { useTranslate } from 'src/composable/translate';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BankModalFooter',
  setup() {
    const { translate } = useTranslate();
    return { translate };
  },
});
</script>
