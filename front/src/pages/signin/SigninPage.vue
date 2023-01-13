<template>
  <bank-main>
    <q-page v-theme-login-background>
      <div class="row items-center justify-center absolute-full full-height">
        <q-card class="card-signin" v-theme-card-login>
          <q-card-section class="flex justify-center">
            <q-form class="q-pa-md" @submit.prevent="handleSignin">
              <div class="row q-px-lg">
                <div class="col-12 q-mb-md">
                  <div class="flex justify-center">
                    <bank-logo v-theme-logo />
                  </div>
                </div>
                <div class="col-12">
                  <q-input
                    outlined
                    dense
                    :rules="rules.email"
                    type="text"
                    v-model="send.email"
                    :label="translate.email"
                  >
                    <template v-slot:prepend>
                      <q-icon size="14px" name="mdi-email" />
                    </template>
                  </q-input>
                </div>

                <div class="col-12">
                  <q-input
                    outlined
                    dense
                    :rules="rules.password"
                    :label="translate.password"
                    v-model="send.password"
                    :type="inputText ? 'text' : 'password'"
                  >
                    <template v-slot:prepend>
                      <q-icon size="14px" name="mdi-lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        @click="inputText = !inputText"
                        size="14px"
                        :name="inputText ? 'mdi-eye-off' : 'mdi-eye'"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <bank-select-language
                    v-model="send.language"
                    :rules="rules.language"
                    class="full-width"
                  />
                </div>
                <div class="col-12">
                  <q-btn
                    type="submit"
                    :label="translate.log_in"
                    v-theme-button
                    unelevated
                    :loading="loading"
                    :disable="loading"
                    class="full-width text-white"
                  />
                </div>
                <div class="col-12 q-mt-md" v-if="errorLogin">
                  <q-toolbar class="text-white" :class="messageError.color">
                    <q-btn flat round dense :icon="messageError.icon" />
                    <q-toolbar-title class="text-caption">
                      {{ messageError.msg }}
                    </q-toolbar-title>
                  </q-toolbar>
                </div>
              </div>
              <div class="row q-mt-sm relative-position q-pa-md">
                <a
                  href="/signup"
                  class="absolute-top items-center justify-center text-brown flex items-center justify-center"
                >
                  {{ translate.register_account }}
                </a>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </bank-main>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from 'vue';
import { useRules } from 'src/composable/rules';
import { useTranslate } from 'src/composable/translate';
import { useAuth } from 'src/composable/auth';
import { useAuthStore } from 'src/stores/auth/auth';

export default defineComponent({
  name: 'Signin',
  setup() {
    const { getLanguage } = useAuth();
    const { translate, changeLanguage } = useTranslate();
    const storeAuth = useAuthStore();
    const rules = useRules();
    const state = reactive({
      inputText: false,
      send: {
        email: '',
        password: '',
        language: getLanguage(),
      },
    });

    watch(
      () => state.send.language,
      (lang) => {
        changeLanguage(lang);
      }
    );

    const errorLogin = computed(() => {
      return storeAuth.erro;
    });

    const messageError = computed(() => {
      switch (storeAuth.error_status) {
        case 'invalid_fields_login':
        case 'unauthorized':
          return {
            msg: translate.value.message.invalid_fields_login,
            color: 'bg-orange',
            icon: 'mdi-information',
          };
        default:
          return {};
      }
    });

    const loading = computed(() => {
      return storeAuth.loading;
    });

    const handleSignin = () => {
      changeLanguage(state.send.language);
      storeAuth.AUTH_REQUEST({ ...state.send });
    };

    return {
      rules,
      translate,
      errorLogin,
      loading,
      messageError,
      ...toRefs(state),
      handleSignin,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-signin {
  width: 300px;
  border-radius: 0;
}
</style>
