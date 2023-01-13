<template>
  <bank-modal
    v-model="model"
    :modal-content="{ padding: 0 }"
    width="800px"
    :loading="loading"
  >
    <template v-slot:title>
      <q-icon name="mdi-plus-circle" color="white" size="25px" />
      <b class="text-white q-ml-sm"> Adicionar whitelabels</b>
    </template>
    <template v-slot:content>
      <div class="row q-col-gutter-y-sm">
        <div class="col-12">
          <q-form ref="formRef">
            <bank-tabs
              v-model="tab"
              vertical
              class-tab-panel="no-padding"
              :tabs="tabOptions"
            >
              <template v-slot:all>
                <div class="row q-mb-md">
                  <div class="col-12">
                    <q-input
                      label="Nome do tema"
                      v-model="storeWhitelabel.formWhitelabel.name"
                      outlined
                      :rules="rules.name"
                      hide-bottom-space
                      dense
                    />
                  </div>
                </div>
              </template>
              <template v-slot:menu>
                <tab-menu />
              </template>
              <template v-slot:logo>
                <tab-logo />
              </template>
              <template v-slot:sidebar>
                <tab-sidebar />
              </template>
              <template v-slot:button>
                <tab-button />
              </template>
              <template v-slot:modal>
                <tab-modal />
              </template>
              <template v-slot:login>
                <tab-login />
              </template>
            </bank-tabs>
          </q-form>
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <bank-modal-footer @save="handleWhitelabel" />
    </template>
  </bank-modal>
</template>
<script lang="ts">
import { useWhitelabelStore } from 'src/stores/whitelabel/whitelabel';
import { defineComponent, computed, reactive, toRefs, watch, ref } from 'vue';
import TabButton from './tabs/TabButton.vue';
import TabLogin from './tabs/TabLogin.vue';
import TabLogo from './tabs/TabLogo.vue';
import TabMenu from './tabs/TabMenu.vue';
import TabModal from './tabs/TabModal.vue';
import TabSidebar from './tabs/TabSidebar.vue';
import { useRules } from 'src/composable/rules';

export default defineComponent({
  name: 'ModalAddWhitelabel',
  components: { TabLogo, TabSidebar, TabButton, TabLogin, TabModal, TabMenu },
  setup() {
    const storeWhitelabel = useWhitelabelStore();
    const formRef = ref();
    const rules = useRules();
    const state = reactive({
      tab: 'menu',
    });

    const model = computed({
      get() {
        return storeWhitelabel.openModalWhitelabel;
      },
      set(value: boolean) {
        storeWhitelabel.OPEN_MODAL_WHITELABEL(value);
      },
    });

    const loading = computed(() => {
      return storeWhitelabel.loadingModal;
    });

    const tabOptions = computed(() => {
      return [
        { name: 'menu', label: 'Menu', align: 'left' },
        { name: 'logo', label: 'Logo' },
        { name: 'sidebar', label: 'Sidebar' },
        { name: 'button', label: 'Botões' },
        { name: 'modal', label: 'Modal' },
        { name: 'login', label: 'Login' },
      ];
    });

    watch(
      () => model.value,
      (isOpen) => {
        !isOpen && reset();
      }
    );

    const reset = () => {
      formRef.value.reset();
      model.value = false;
      storeWhitelabel.SET_FORM_WHITELABEL();
    };

    const handleWhitelabel = async () => {
      formRef.value.validate().then(async (success: boolean) => {
        if (success) {
          await storeWhitelabel.REQUEST_CREATE_OR_UPDATE_WHITELABEL({
            ...storeWhitelabel.formWhitelabel,
          });
          reset();
        }
      });
    };

    return {
      model,
      tabOptions,
      loading,
      formRef,
      storeWhitelabel,
      rules,
      handleWhitelabel,
      ...toRefs(state),
    };
  },
});
</script>
