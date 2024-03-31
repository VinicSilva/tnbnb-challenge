<template>
  <div class="row full-width pi-no-data items-center no-padding">
    <div class="col-12">
      <div class="flex items-center justify-center">
        <q-icon name="mdi-information" size="50px"></q-icon>
        <div class="full-width flex items-center justify-center q-mt-sm">
          <p>{{ translate.no_data }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { useTranslate } from 'src/composable/translate';

export default defineComponent({
  name: 'PiNoData',
  setup() {
    const { translate } = useTranslate();
    return {
      translate,
    }
  }
});
</script>
<style lang="scss" scoped>
.pi-no-data {
  min-height: 200px;
  color: #4c4c4c;
}
</style>
