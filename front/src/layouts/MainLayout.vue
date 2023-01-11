<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          BNB Bank
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" elevated>
      <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link"></EssentialLink>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'src/components/EssentialLink.vue'
import { ref } from 'vue'
import { linksList } from './menu';

export default {
    setup() {
        const leftDrawerOpen = ref(false);
        return {
            linksList,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            }
        };
    },
    components: { EssentialLink }
}
</script>