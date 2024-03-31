<template>
  <pi-main>
    <q-page v-theme-login-background>
      <div class="row items-center justify-center absolute-full full-height">
        <q-card class="card-signup" v-theme-card-login>
          <q-card-section class="flex justify-center">
            <q-form class="q-pa-md" @submit.prevent="handleSignup">
              <div class="row q-px-lg">
                <div class="col-12 q-mb-md">
                  <div class="flex justify-center">
                    <pi-logo v-theme-logo />
                  </div>
                </div>
                <div class="col-12">
                  <q-input
                    outlined
                    dense
                    :rules="rules.name"
                    type="text"
                    v-model="send.name"
                    :label="translate.name"
                  >
                    <template v-slot:prepend>
                      <q-icon size="14px" name="mdi-account" />
                    </template>
                  </q-input>
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
                    :rules="rules.birth_date"
                    type="date"
                    v-model="send.birth_date"
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
                    :rules="rules.cpf"
                    type="text"
                    v-model="send.cpf"
                    :label="translate.cpf"
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
                <q-input
                  outlined
                  dense
                  :rules="rules.password"
                  :label="translate.password_confirmation"
                  v-model="send.password_confirmation"
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
                  <pi-select-language
                    v-model="send.language"
                    :rules="rules.language"
                    class="full-width"
                  />
                </div>
                <div class="col-12">
                  <q-btn
                    type="submit"
                    :label="translate.to_register"
                    v-theme-button
                    unelevated
                    :loading="loading"
                    :disable="loading"
                    class="full-width text-white"
                  />
                </div>
              </div>
              <div class="row q-mt-sm relative-position q-pa-md">
                <a
                  href="/signin"
                  class="absolute-top items-center justify-center text-brown flex items-center justify-center"
                >
                  {{ translate.already_have_account }}
                </a>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </pi-main>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from 'vue';
import { useRules } from 'src/composable/rules';
import { useTranslate } from 'src/composable/translate';
import { useAuth } from 'src/composable/auth';
import { useUsersStore } from 'src/stores/users/user';

export default defineComponent({
  name: 'Signup',
  setup() {
    const { getLanguage } = useAuth();
    const { translate, changeLanguage } = useTranslate();
    const storeUser = useUsersStore();
    const rules = useRules();
    const state = reactive({
      inputText: false,
      send: {
        name: '',
        email: '',
        birth_date: '',
        cpf: '',
        type: 'admin',
        password: '',
        password_confirmation: '',
        language: getLanguage(),
      },
    });

    watch(
      () => state.send.language,
      (lang) => {
        changeLanguage(lang);
      }
    );

    const loading = computed(() => {
      return storeUser.loading;
    });

    const handleSignup = () => {
      changeLanguage(state.send.language);
      storeUser.REQUEST_REGISTER_USER({ ...state.send });
    };

    return {
      rules,
      translate,
      loading,
      ...toRefs(state),
      handleSignup,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-signup {
  width: 300px;
  border-radius: 0;
}
</style>
