<template>
  <div class="logo">
    <img :src="src" :class="{'with-right':withRight}" />
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PiLogo',
  props: {
    withRight:{
      type: Boolean,
      default:false
    },
    src: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  width: 250px;
  max-height: 40px;
  > img {
    position: relative;
  }
  .with-right{
    right: 0.8em;
  }
}
</style>
