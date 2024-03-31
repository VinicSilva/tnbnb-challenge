<template>
  <q-btn-dropdown
    no-caps
    dense
    flat
    unelevated
    content-class="no-border-radius no-shadow"
    content-style="border:1px solid #e4e4e4"
    class="btn-profile no-border-radius test"
  >
    <template v-slot:label>
      <div class="row items-center">
        <q-avatar color="blue" size="30px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="" />
        </q-avatar>
        <div class="name q-ml-sm">{{ user.name }}</div>
      </div>
    </template>
    <div class="row items-center no-wrap q-pa-sm q-col-gutter-x-sm">
      <div class="col-3">
        <q-avatar size="40px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>
      <div class="col-7 column">
        <b class="full-width ellipsis">{{ user.name }}</b>
        <small class="ellipsis" style="max-width: 140px">
          {{ user.email }}
        </small>
      </div>
      <div class="col-2 text-center">
        <q-btn
          icon="mdi-power-standby"
          round
          size="xs"
          @click="logout"
          unelevated
          v-close-popup
        />
      </div>
    </div>
  </q-btn-dropdown>
</template>
<script>
import { useAuth } from 'src/composable/auth';
import { useAuthStore } from 'src/stores/auth/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BankProfile',
  setup() {
    const { getUserLogged } = useAuth();
    const storeAuth = useAuthStore();

    const logout = () => {
      storeAuth.LOGOUT();
    };

    return {
      user: getUserLogged.value,
      logout,
    };
  },
});
</script>

<style lang="scss">
.btn-profile {
  height: 55px;
}
</style>
