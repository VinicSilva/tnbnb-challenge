<template>
  <q-list>
    <q-item
      v-for="(item, index) in up"
      :key="index"
      exact
      :to="item.to"
      :class="{
        'bg-grey-3': item.active && !mini,
      }"
    >
      <q-item-section
        avatar
        class="menu-item"
        :title="item.text"
        :class="{
          'item-active': item.active && mini,
          'bg-red': item.active && !mini,
        }"
        v-theme-menu-header
      >
        <q-icon size="20px" v-theme-sidebar-icon :name="item.icon" />
      </q-item-section>
      <q-item-section v-theme-sidebar-text>
        {{ item.text }}
      </q-item-section>
      <q-tooltip
        v-if="mini"
        anchor="center right"
        self="center left"
        :offset="[10, 0]"
      >
        {{ item.text }}
      </q-tooltip>
    </q-item>
  </q-list>

  <q-list class="absolute-bottom">
    <q-item v-for="(item, index) in down" :key="index" exact :to="item.to">
      <q-item-section
        avatar
        class="menu-item"
        :title="item.text"
        :class="{
          'item-active': item.active && mini,
          'bg-grey-2': item.active && !mini,
        }"
      >
        <q-icon size="20px" v-theme-sidebar-icon :name="item.icon" />
      </q-item-section>
      <q-item-section v-theme-sidebar-text>
        {{ item.text }}
      </q-item-section>
      <q-tooltip
        v-if="mini"
        anchor="center right"
        self="center left"
        :offset="[10, 0]"
      >
        {{ item.text }}
      </q-tooltip>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface iMenus {
  text: string;
  icon: string;
  to: string;
}

export default defineComponent({
  name: 'BankMenu',
  props: {
    up: {
      type: Array as () => PropType<iMenus>,
      default: () => [],
    },
    down: {
      type: Array as () => PropType<iMenus>,
      default: () => [],
    },
    mini: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style lang="scss">
.menu-item {
  &.item-active {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 100px;
    .q-icon {
      color: #fff $i;
    }
  }
  &:not(.item-active) {
    background: unset $i;
  }
}
</style>
