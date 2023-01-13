<template>
  <q-card class="card-layout" flat>
    <q-card-section class="bg-grey-11 q-pa-sm">
      <div class="row justify-between items-center">
        <slot name="checkbox" />
        <b
          class="ellipsis text-center"
          :title="themeName"
          v-text="themeName"
        ></b>
        <bank-dropdown-actions @edit="$emit('edit')" @remove="$emit('remove')">
        </bank-dropdown-actions>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-sm">
      <q-card flat class="bi-layout">
        <div class="rounded-borders overflow-hidden">
          <div class="row">
            <div class="col-12 header" :style="{ background: colorHeader }">
              <div class="row items-center full-height">
                <bank-logo
                  class="q-mt-xs"
                  src="https://logosmarcas.net/wp-content/uploads/2020/04/Nike-Logo.png"
                />

                <q-btn
                  icon="mdi-menu"
                  round
                  size="10px"
                  flat
                  color="white"
                ></q-btn>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-3 sidebar" :style="{ background: colorSidebar }">
              <q-list class="menu">
                <q-item v-for="(item, index) in menus" dense :key="index">
                  <div class="row items-center">
                    <q-icon
                      size="10px"
                      :style="{ color: colorSidebarIcon }"
                      :name="item.icon"
                    />
                    <span
                      class="q-ml-xs ellipsis menu-item-name"
                      :style="{ color: colorSidebarText }"
                    >
                      {{ item.text }}
                    </span>
                  </div>
                </q-item>
              </q-list>
            </div>
            <div class="col-9">
              <q-page class="q-pa-sm" style="min-height: 100% !important">
                <div class="row full-width">
                  <div class="col-3">
                    <q-skeleton width="90%" type="QBtn" />
                  </div>
                  <div class="col-3">
                    <q-skeleton width="90%" type="QBtn" />
                  </div>
                  <div class="col-3">
                    <q-skeleton width="90%" type="QBtn" />
                  </div>
                  <div class="col-3">
                    <q-skeleton width="100%" type="QBtn" />
                  </div>
                </div>

                <div class="row full-width q-mt-sm">
                  <div class="col-12">
                    <q-skeleton width="100%" type="QBtn" />
                  </div>
                </div>

                <div class="row full-width q-mt-sm">
                  <div class="col-12">
                    <q-skeleton width="100%" type="QBtn" />
                  </div>
                </div>
              </q-page>
            </div>
          </div>
        </div>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { useTranslate } from 'src/composable/translate';
import { computed } from 'vue';

export default defineComponent({
  props: {
    themeName: {
      type: String,
      default: '',
    },
    colorHeader: {
      type: String,
      default: '',
    },
    colorSidebar: {
      type: String,
      default: '',
    },
    colorSidebarIcon: {
      type: String,
      default: '',
    },
    colorSidebarText: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { translate } = useTranslate();

    const menus = computed(() => {
      return [
        { text: 'Playlist', icon: 'mdi-youtube-tv' },
        {
          text: translate.value.domain,
          icon: 'mdi-web',
        },
        {
          text: translate.value.groups,
          icon: 'mdi-account-group',
        },
      ];
    });

    return {
      menus,
      translate,
    };
  },
});
</script>
<style lang="scss" scoped>
.card-layout {
  border: 1px solid #e4e4e4;
  .bi-layout {
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    .header {
      height: 30px;
    }
    .logo {
      width: 60px;
      height: 15px;
    }
    .sidebar {
      border-right: 1px solid #e0e0e0;
    }
    .menu {
      .q-item {
        min-height: 20px $i;
        padding: 0px 4px $i;
      }
      .menu-item-name {
        font-size: 8px;
      }
    }
  }
}
</style>
