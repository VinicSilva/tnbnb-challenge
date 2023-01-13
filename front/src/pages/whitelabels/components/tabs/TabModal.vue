<template>
  <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
    <div class="col-12">
      <q-input
        outlined
        dense
        v-model="storeWhitelabel.formWhitelabel.modal"
        :rules="rules.modal"
        hide-bottom-space
        label="Modal"
      >
        <template v-slot:prepend>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color v-model="storeWhitelabel.formWhitelabel.modal" />
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
        <q-card>
          <q-card-section v-theme-modal>
            <div class="row items-center text-white">
              <q-icon size="20px" name="mdi-plus-circle"></q-icon>
              <b class="q-ml-sm">Adicionar</b>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  disable
                  label="Nome"
                  v-model="formExample.name"
                ></q-input>
              </div>
              <div class="col-12">
                <q-input
                  label="Email"
                  v-model="formExample.email"
                  outlined
                  disable
                  dense
                ></q-input>
              </div>
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  label="Senha"
                  type="password"
                  disable
                  v-model="formExample.password"
                ></q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </fieldset>
    </div>
    <!-- preview -->
    <div class="col-6">
      <fieldset>
        <legend>
          <q-icon name="mdi-eye" class="q-mr-xs" />
          Preview
        </legend>
        <q-card>
          <q-card-section :style="{ background: storeWhitelabel.formWhitelabel.modal }">
            <div class="row items-center text-white">
              <q-icon size="20px" name="mdi-plus-circle"></q-icon>
              <b class="q-ml-sm">Adicionar</b>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  disable
                  label="Nome"
                  v-model="formExample.name"
                ></q-input>
              </div>
              <div class="col-12">
                <q-input
                  label="Email"
                  v-model="formExample.email"
                  outlined
                  disable
                  dense
                ></q-input>
              </div>
              <div class="col-12">
                <q-input
                  outlined
                  dense
                  label="Senha"
                  type="password"
                  disable
                  v-model="formExample.password"
                ></q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </fieldset>
    </div>
  </div>
</template>
<script lang="ts">
import { useRules } from 'src/composable/rules';
import { useWhitelabelStore } from 'src/stores/whitelabel/whitelabel';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'TabModal',
  setup() {
    const storeWhitelabel = useWhitelabelStore();
    const rules = useRules();
    const state = reactive({
      formExample: {
        name: 'Example',
        email: 'example@example.com',
        password: 'Example',
      },
    });


    return { ...toRefs(state), storeWhitelabel,rules };
  },
});
</script>
