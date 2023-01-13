<template>
  <bi-modal v-model="openModal" :loading="loading">
    <template #title>
      <q-icon :name="modalTitle.icon" color="white" size="25px" />
      <b class="text-white q-ml-sm"> {{ modalTitle.text }}</b>
    </template>
    <template #content>
      <q-form @submit.prevent="handleBi" ref="formRef">
        <div class="row q-col-gutter-y-xs q-col-gutter-x-sm">
          <div class="col-12">
            <q-input
              outlined
              dense
              v-model="send.usuario_powerbi"
              :label="translate.user"
              :rules="rules.user"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-account"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              type="password"
              v-model="send.senha_powerbi"
              :label="translate.password"
              :class="{ 'q-mb-md': send.id }"
              :rules="send.id ? [] : rules.password"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-lock"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12" v-if="isAdmin">
            <q-select
              v-model="send.nivel_autenticacao"
              :options="authLevelOptions"
              label="Nível de autenticação"
              :rules="rules.auth_level"
              map-options
              emit-value
              outlined
              dense
            ></q-select>
          </div>
          <div class="col-12 relative-position" style="bottom: 0.5em">
            <fieldset>
              <legend><q-icon name="mdi-microsoft-azure" /> Azure</legend>
              <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
                <div class="col-12">
                  <q-input
                    label="Client ID"
                    dense
                    outlined
                    hide-bottom-space
                    :rules="rules.client_id"
                    v-model="send.client_id_azure"
                  ></q-input>
                </div>
                <div class="col-12">
                  <q-input
                    label="Client Secret"
                    dense
                    outlined
                    hide-bottom-space
                    :rules="rules.client_secret"
                    v-model="send.client_secret_azure"
                  ></q-input>
                </div>
                <div class="col-12">
                  <q-input
                    label="Diretório ID"
                    dense
                    outlined
                    hide-bottom-space
                    :rules="rules.directory_secret"
                    v-model="send.diretorio_id_azure"
                  ></q-input>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </q-form>
    </template>
    <template #actions>
      <bi-modal-footer @save="handleBi" />
    </template>
  </bi-modal>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch, ref } from 'vue';
import { useRules } from 'src/composable/rules';
import { useTranslate } from 'src/composable/translate';
import { configModalTitle } from 'src/utils';
import { usePowerBiStore } from 'src/stores/power_bi/power_bi';
import { iPowerBiTenant } from 'src/model/powerBiModel';
import { useAuth } from 'src/composable/auth';

interface iState {
  send: iPowerBiTenant;
}

export default defineComponent({
  name: 'ModalAddPowerBi',
  setup() {
    const { translate } = useTranslate();
    const powerBiStore = usePowerBiStore();
    const { getUserLogged } = useAuth();
    const rules = useRules();
    const formRef = ref();
    const state: iState = reactive({
      send: {} as iPowerBiTenant,
    });

    const modalTitle = computed(() => {
      return configModalTitle(state.send.id, {
        edit: 'Editar Power Bi',
        add: 'Adicionar Power Bi',
      });
    });

    const isAdmin = computed(() => {
      return getUserLogged.value.type === 'admin';
    });

    const openModal = computed({
      get() {
        return powerBiStore.openModalPowerBi;
      },
      set(value: boolean) {
        powerBiStore.OPEN_MODAL_POWER_BI(value);
      },
    });

    const authLevelOptions = computed(() => {
      return [
        { label: 'Empresa', value: 'empresa' },
        { label: 'Usuário', value: 'usuario' },
      ];
    });

    const loading = computed(() => {
      return powerBiStore.loadingModal;
    });

    watch(
      () => openModal.value,
      (isOpen) => {
        state.send = { ...powerBiStore.$state.form };
        !isOpen && reset();
      }
    );

    const reset = () => {
      formRef.value.reset();
      openModal.value = false;
      powerBiStore.SET_FORM_POWER_BI();
    };

    const handleBi = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          await powerBiStore.REQUEST_ADD_OR_UPDATE_POWER_BI(state.send);
          reset();
        }
      });
    };

    return {
      openModal,
      translate,
      rules,
      modalTitle,
      loading,
      formRef,
      isAdmin,
      authLevelOptions,
      ...toRefs(state),
      handleBi,
    };
  },
});
</script>
