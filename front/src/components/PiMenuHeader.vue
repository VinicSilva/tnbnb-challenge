<template>
  <q-header bordered v-theme-menu-header class="menu-header">
    <q-toolbar class="no-padding">
      <q-toolbar-title>
        <div class="row menu-title items-center">
          <pi-logo with-right v-theme-logo />
          <q-btn
            class="btn-toggle no-border-radius"
            dense
            flat
            icon="mdi-dots-grid"
            @click="$emit('toggle')"
          />
        </div>
      </q-toolbar-title>
      <div class="row items-center">
        <pi-dropdown-language class="mobile-hide" />
        <q-btn
          class="q-mr-sm mobile-hide"
          flat
          style="height: 55px"
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen?.isActive ? 'fullscreen_exit' : 'fullscreen'"
        />
        <pi-profile />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PiMenuHeader',
});
</script>

<style lang="scss" scoped>
$menu: 55px;
.menu-header {
  height: $menu;
  .menu-title {
    height: $menu;
  }

  .btn-toggle {
    height: 55px;
    width: 55px;
  }

  .btn-help,
  .btn-avatar {
    width: 35px;
    height: 35px;
  }
}
</style>
