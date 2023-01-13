<template>
  <bi-modal
    v-model="openModal"
    :loading="loading"
  >
    <template #title>
      <q-icon :name="modalTitle.icon" color="white" size="25px" />
      <b class="text-white q-ml-sm"> {{ modalTitle.text }}</b>
    </template>
    <template #content>
      <q-form @submit.prevent="handleCompanies" ref="formRef">
        <div class="row q-col-gutter-y-xs q-col-gutter-x-md">
          <div class="col-6">
            <q-input
              outlined
              dense
              :label="translate.company_name"
              :rules="rules.company_name"
              v-model="send.nome_tenant"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-office-building"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-6">
            <q-input
              outlined
              dense
              type="number"
              min="0"
              max="100"
              :rules="rules.user_limit"
              v-model.number="send.limit_usuarios"
              :label="translate.user_limit"
            ></q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              :rules="rules.email"
              :label="translate.email"
              v-model="send.email"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-email"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              outlined
              dense
              type="password"
              :rules="send.id ? [] : rules.password"
              :class="{ 'q-mb-md': send.id }"
              :label="translate.password"
              v-model="send.password"
            >
              <template v-slot:prepend>
                <q-icon size="14px" name="mdi-lock"></q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-select
              outlined
              dense
              label="Autenticação Power BI"
              :rules="rules.bi"
              map-options
              emit-value
              :options="powerBiOptions"
              v-model="send.conta_powerbi"
            ></q-select>
          </div>
          <div class="col-12 q-mb-md">
            <fieldset class="q-mb-sm">
              <legend>Permisões</legend>
              <div class="row q-col-gutter-x-md">
                <div class="col-6">
                  <q-list bordered class="rounded-borders">
                    <q-item
                      tag="label"
                      dense
                      v-ripple
                      class="q-pa-xs bg-grey-3 text-black"
                    >
                      <q-item-section>
                        <q-toggle
                          size="sm"
                          keep-color
                          v-model="send.permite_definir_subdominio"
                          :val="send.permite_definir_subdominio"
                          :color="
                            send.permite_definir_subdominio === 'S'
                              ? 'green'
                              : 'red'
                          "
                          true-value="S"
                          false-value="N"
                          checked-icon="mdi-check"
                          label="Definir subdominio"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col-6">
                  <q-list bordered class="rounded-borders">
                    <q-item
                      tag="label"
                      dense
                      v-ripple
                      class="q-pa-xs bg-grey-3 text-black"
                    >
                      <q-item-section>
                        <q-toggle
                          size="sm"
                          keep-color
                          v-model="send.permite_definir_tema"
                          :val="send.permite_definir_tema"
                          :color="
                            send.permite_definir_tema === 'S' ? 'green' : 'red'
                          "
                          true-value="S"
                          false-value="N"
                          checked-icon="mdi-check"
                          label="Definir temas"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </div>
            </fieldset>
          </div>

          <div class="col-12">
            <bi-filter-component
              :disable-toggle="send.ativar_ris"
              v-model:type="send.tipo_filtro"
              v-model:enabled="send.ativar_filtro"
              v-model:filter="send.listFilter"
            />
          </div>
          <div class="col-12 q-mt-md">
            <bi-ris-component
              :disable-toggle="send.ativar_filtro"
              v-model:type="send.tipo_filtro"
              v-model:enabled="send.ativar_ris"
              v-model:ris="send.listRis"
            />
          </div>
        </div>
      </q-form>
    </template>
    <template #actions>
      <bi-modal-footer @save="handleCompanies" />
    </template>
  </bi-modal>
</template>
<script lang="ts">
import { useRules } from 'src/composable/rules';
import { useTranslate } from 'src/composable/translate';
import { iFormCompanies } from 'src/model/companiesModel';
import { useCompaniesStore } from 'src/stores/companies/companies';
import { configModalTitle } from 'src/utils';
import { defineComponent, computed, reactive, toRefs, ref, watch } from 'vue';

interface iState {
  send: iFormCompanies;
}

export default defineComponent({
  name: 'ModalAddCompanies',
  setup() {
    const { translate } = useTranslate();
    const storeCompanies = useCompaniesStore();
    const rules = useRules();
    const formRef = ref();
    const state: iState = reactive({
      send: {} as iFormCompanies,
    });

    const openModal = computed({
      get() {
        return storeCompanies.openModal;
      },
      set(value: boolean) {
        storeCompanies.SET_OPEN_MODAL_COMPANIES(value);
      },
    });

    const modalTitle = computed(() => {
      return configModalTitle(state.send.id, {
        edit: 'Editar empresa',
        add: 'Adicionar empresa',
      });
    });

    const powerBiOptions = computed(() => {
      return [
        { label: 'Conta do parceiro', value: 'parceiro' },
        { label: 'Conta da empresa', value: 'empresa' },
      ];
    });

    const loading = computed(() => {
      return storeCompanies.loadingModal;
    });

    watch(
      () => openModal.value,
      (isOpen) => {
        state.send = { ...storeCompanies.$state.form };
        !isOpen && reset();
      }
    );

    const reset = () => {
      formRef.value.reset();
      openModal.value = false;
      storeCompanies.SET_FORM_COMPANIES();
    };

    const handleCompanies = () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          await storeCompanies.REQUEST_ADD_OR_UPDATE_COMPANIES(state.send);
          reset();
        }
      });
    };

    return {
      modalTitle,
      loading,
      openModal,
      translate,
      rules,
      formRef,
      powerBiOptions,
      ...toRefs(state),
      handleCompanies,
    };
  },
});
</script>
