<template>
  <div class="row q-col-gutter-y-sm q-col-gutter-x-sm">
    <div class="col-12">
      <q-input
        outlined
        dense
        v-model="storeWhitelabel.formWhitelabel.login_background"
        :rules="rules.background"
        label="Cor de fundo"
        hide-bottom-space
      >
        <template v-slot:prepend>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color
                v-model="storeWhitelabel.formWhitelabel.login_background"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-12">
      <q-input
        outlined
        dense
        class="q-mt-sm"
        v-model="storeWhitelabel.formWhitelabel.card_login"
        :rules="rules.background"
        label="Cor do card"
        hide-bottom-space
      >
        <template v-slot:prepend>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color v-model="storeWhitelabel.formWhitelabel.card_login" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <!-- preview -->
    <div class="col-6">
      <fieldset>
        <legend>
          <q-badge v-theme-modal class="q-pa-xs"> Atual do sistema </q-badge>
        </legend>
        <div v-theme-login-background class="flex justify-center q-pa-md">
          <q-card class="card-login" v-theme-card-login>
            <q-card-section>
              <div class="row justify-center">
                <bank-logo v-theme-logo class="logo-preview" />
              </div>
              <div class="row q-pa-md q-col-gutter-x-sm q-col-gutter-y-md">
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
                <div class="col-12">
                  <q-btn v-theme-button class="full-width text-white">
                    Entrar
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </fieldset>
    </div>
    <div class="col-6">
      <fieldset>
        <legend>
          <q-icon name="mdi-eye" class="q-mr-xs" />
          Preview
        </legend>
        <div
          class="flex justify-center q-pa-md"
          :style="{
            background: storeWhitelabel.formWhitelabel.login_background,
          }"
        >
          <q-card
            class="card-login"
            :style="{
              background: storeWhitelabel.formWhitelabel.card_login,
            }"
          >
            <q-card-section>
              <div class="row justify-center">
                <bank-logo v-if="logo" :src="logo" class="logo-preview" />
                <bank-logo v-else v-theme-logo class="logo-preview" />
              </div>
              <div class="row q-pa-md q-col-gutter-x-sm q-col-gutter-y-md">
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
                <div class="col-12">
                  <q-btn
                    :style="{
                      background: storeWhitelabel.formWhitelabel.button,
                    }"
                    class="full-width text-white"
                  >
                    Entrar
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </fieldset>
    </div>
  </div>
</template>
<script lang="ts">
import { useRules } from 'src/composable/rules';
import { useWhitelabelStore } from 'src/stores/whitelabel/whitelabel';
import { defineComponent, reactive, toRefs, onMounted } from 'vue';

export default defineComponent({
  name: 'TabLogin',
  setup() {
    const storeWhitelabel = useWhitelabelStore();
    const rules = useRules();
    const state = reactive({
      logo: '',
      formExample: {
        name: 'Example',
        email: 'example@example.com',
        password: 'Example',
      },
    });

    onMounted(() => {
      state.logo = storeWhitelabel.formWhitelabel.logo;
    });

    return {
      storeWhitelabel,
      rules,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.card-login {
  zoom: 0.3;
  width: 200px;
  .logo-preview {
    zoom: 0.7;
  }
}
</style>
