<template>
  <q-card flat class="card-dashboard" :style="{ background: color }">
    <div class="context-icon flex items-center justify-center">
      <q-icon size="50px" :name="icon" />
    </div>
    <div class="context-details">
      <b class="description ellipsis" :title="text" v-text="text"></b>
      <b class="value" v-text="value"></b>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardDashboard',
  props: {
    text: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.card-dashboard {
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  .context-icon {
    width: 30%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  .context-details {
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 8px 8px 6px 8px;
    b {
      width: 100%;
      color: #fff;
      &.description {
        font-size: 18px;
      }

      &.value {
        font-size: 28px;
        line-height: 27px;
      }
    }
  }
}
</style>
