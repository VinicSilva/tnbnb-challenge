<template>
  <div class="row ful-height">
    <div class="col-12">
      <q-file
        outlined
        dense
        label="Logo upload"
        hint="Tamanho de 230x40"
        clearable
        v-model="storeWhitelabel.formWhitelabel.logo"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
    </div>
    <div class="col-12">
      <fieldset>
        <legend>
          <q-badge v-theme-modal class="q-pa-xs"> Atual do sistema </q-badge>
        </legend>
        <q-toolbar v-theme-menu-header>
          <bank-logo v-theme-logo />
          <q-btn flat round dense icon="menu" class="text-white" />
        </q-toolbar>
      </fieldset>
    </div>
    <div class="col-12" v-if="storeWhitelabel.formWhitelabel.logo">
      <fieldset>
        <legend>
          <q-icon name="mdi-eye" class="q-mr-xs" />
          Preview
        </legend>
        <q-toolbar
          :style="{ background: storeWhitelabel.formWhitelabel.header }"
        >
          <bank-logo :src="img" />
          <q-btn flat round dense icon="menu" class="text-white" />
        </q-toolbar>
      </fieldset>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { useWhitelabelStore } from 'src/stores/whitelabel/whitelabel';
import { getFilePreview } from 'src/utils';

export default defineComponent({
  name: 'TabLogo',
  setup() {
    const storeWhitelabel = useWhitelabelStore();
    const state = reactive({
      img: '',
    });

    watch(
      () => storeWhitelabel.formWhitelabel.logo,
      (file: File) => {
        getFilePreview(file, (path: string) => (state.img = path));
      }
    );

    return { ...toRefs(state), storeWhitelabel };
  },
});
</script>
