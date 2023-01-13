<template>
  <bank-main>
    <bank-menu-header @toggle="toggleSidebar" />
    <q-drawer
      behavior="desktop"
      v-theme-sidebar
      class="sidebar-left"
      v-model="openSidebar"
      side="left"
      bordered
      :width="250"
      :mini="mini"
    >
      <bank-menu :mini="mini" v-bind="menu" />
    </q-drawer>

    <router-view />
  </bank-main>
</template>

<script lang="ts">
import { useMenu } from 'src/composable/menu';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const { menu } = useMenu();
    const state = reactive({
      openSidebar: true,
      mini: true,
    });

    const toggleSidebar = () => {
      state.mini = !state.mini;
    };

    return {
      menu,
      ...toRefs(state),
      toggleSidebar,
    };
  },
});
</script>
