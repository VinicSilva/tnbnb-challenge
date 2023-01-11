<template>
  <div
    class="column window-height window-width row justify-center"
  >
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <q-card square bordered class="q-pa-lg shadow-1 bg-deep-purple-7">
          <q-card-section>
            <h4 class="text-h7 text-white q-my-md text-center">BNB Bank</h4>
          </q-card-section>
      </q-card>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 offset-md-3">
      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              borderless
              rounded
              filled
              clearable
              v-model="form.username"
              type="text"
              label="username"
            />
            <q-input
              borderless
              rounded
              filled
              clearable
              v-model="form.password"
              type="password"
              label="password"
            />
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            rounded
            unelevated
            color="light-blue-7"
            size="lg"
            class="full-width"
            label="SIGN IN"
          />
        </q-card-actions>
        <q-card-section class="text-center q-pa-none">
          <p class="text-grey-6">
            Not registered?
            <a clickable href="/signup" exact>Created an Account</a>
          </p>
        </q-card-section>
      </q-card>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const form = ref({
      username: '',
      password: '',
    });
    return {
      form,
    };
  },
};
</script>
