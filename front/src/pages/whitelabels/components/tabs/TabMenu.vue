<template>
  <div class="row">
    <div class="col-12">
      <q-input
        outlined
        dense
        :rules="rules.buttons"
        v-model="storeWhitelabel.formWhitelabel.header"
        label="Menu"
      >
        <template v-slot:prepend>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color v-model="storeWhitelabel.formWhitelabel.header" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-12">
      <fieldset>
        <legend>
          <q-badge v-theme-modal class="q-pa-xs"> Atual do sistema </q-badge>
        </legend>
        <q-toolbar v-theme-menu-header> </q-toolbar>
      </fieldset>
    </div>
    <div class="col-12">
      <fieldset>
        <legend>
          <q-icon name="mdi-eye" class="q-mr-xs" />
          Preview
        </legend>
        <q-toolbar
          :style="{ background: storeWhitelabel.formWhitelabel.header }"
        >
        </q-toolbar>
      </fieldset>
    </div>
  </div>
</template>
<script lang="ts">
import { useRules } from 'src/composable/rules';
import { useWhitelabelStore } from 'src/stores/whitelabel/whitelabel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TabMenu',
  setup() {
    const rules = useRules();
    const storeWhitelabel = useWhitelabelStore();

    return { storeWhitelabel , rules };
  },
});
</script>
