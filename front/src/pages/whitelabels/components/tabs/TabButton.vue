<template>
  <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
    <div class="col-12">
      <q-input
        outlined
        dense
        v-model="storeWhitelabel.formWhitelabel.button"
        label="Botões"
        hide-bottom-space
      >
        <template v-slot:prepend>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color v-model="storeWhitelabel.formWhitelabel.button" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-6">
      <fieldset>
        <legend>
          <q-badge v-theme-modal class="q-pa-xs"> Atual do sistema </q-badge>
        </legend>
        <q-btn
          v-theme-button
          unelevated
          class="text-white full-width"
          label="Exemplo"
        />
      </fieldset>
    </div>
    <div class="col-6">
      <fieldset>
        <legend>
          <q-icon name="mdi-eye" class="q-mr-xs" />
          Preview
        </legend>
        <q-btn
          :style="{ background: storeWhitelabel.formWhitelabel.button }"
          unelevated
          label="Exemplo"
          class="text-white full-width"
        />
      </fieldset>
    </div>
  </div>
</template>
<script lang="ts">
import { useWhitelabelStore } from 'src/stores/whitelabel/whitelabel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TabButton',
  setup() {
    const storeWhitelabel = useWhitelabelStore();

    return { storeWhitelabel };
  },
});
</script>
