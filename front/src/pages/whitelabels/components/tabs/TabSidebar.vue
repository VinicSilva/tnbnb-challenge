<template>
  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
    <div class="col-12">
      <fieldset>
        <legend><q-icon name="mdi-palette" size="20px" /> Cores</legend>
        <div class="row q-col-gutter-x-sm q-col-gutter-y-sm">
          <div class="col-12">
            <q-input
              v-model="storeWhitelabel.formWhitelabel.sidebar"
              :rules="rules.sidebar"
              outlined
              dense
              hide-bottom-space
              label="Sidebar"
            >
              <template v-slot:prepend>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-color v-model="storeWhitelabel.formWhitelabel.sidebar" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-6">
            <q-input
              outlined
              dense
              :rules="rules.sidebar_icon"
              v-model="storeWhitelabel.formWhitelabel.sidebar_icon"
              label="Icon"
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
                      v-model="storeWhitelabel.formWhitelabel.sidebar_icon"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-6">
            <q-input
              outlined
              dense
              v-model="storeWhitelabel.formWhitelabel.sidebar_text"
              :rules="rules.sidebar_text"
              label="Texto"
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
                      v-model="storeWhitelabel.formWhitelabel.sidebar_text"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </fieldset>
    </div>
    <div class="col-6">
      <fieldset>
        <legend>
          <q-badge v-theme-modal class="q-pa-xs"> Atual do sistema </q-badge>
        </legend>
        <q-card>
          <bank-menu :up="menus"></bank-menu>
        </q-card>
      </fieldset>
    </div>
    <div class="col-6">
      <fieldset>
        <legend><q-icon name="mdi-eye" class="q-mr-xs" />Preview</legend>
        <q-card :style="{ background: storeWhitelabel.formWhitelabel.sidebar }">
          <q-list class="menu">
            <q-item v-for="(item, index) in menus" :key="index">
              <q-item-section avatar>
                <q-icon
                  size="20px"
                  :style="{
                    color: storeWhitelabel.formWhitelabel.sidebar_icon,
                  }"
                  :name="item.icon"
                />
              </q-item-section>
              <q-item-section
                :style="{ color: storeWhitelabel.formWhitelabel.sidebar_text }"
              >
                {{ item.text }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </fieldset>
    </div>
  </div>
</template>
<script>
import { useRules } from 'src/composable/rules';
import { useTranslate } from 'src/composable/translate';
import { useWhitelabelStore } from 'src/stores/whitelabel/whitelabel';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'TabSidebar',
  setup() {
    const { translate } = useTranslate();
    const storeWhitelabel = useWhitelabelStore();
    const rules = useRules();
    const state = reactive({
      menus: [
        { text: 'Playlist', icon: 'mdi-youtube-tv' },
        {
          text: translate.value.reports,
          icon: 'mdi-file-chart',
        },
        {
          text: translate.value.groups,
          icon: 'mdi-account-group',
        },
      ],
    });

    return { ...toRefs(state), storeWhitelabel,rules };
  },
});
</script>

<style lang="scss" scoped></style>
