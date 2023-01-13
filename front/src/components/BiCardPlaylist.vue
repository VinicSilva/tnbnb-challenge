<template>
  <q-card class="card-playlist" flat>
    <q-card-section class="bg-grey-11 q-pa-sm">
      <div class="row justify-between items-center">
        <slot name="checkbox" />
        <b
          class="ellipsis text-center playlist-name"
          :title="name"
          v-text="name"
        ></b>
        <bi-dropdown-actions>
          <template v-slot:btn-before-edit>
            <q-item dense clickable v-close-popup>
              <q-item-section side>
                <q-icon name="mdi-eye" size="16px" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Visualizar</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </bi-dropdown-actions>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-sm q-mb-sm">
      <div class="row items-center justify-center">
        <q-icon size="50px" class="text-grey" name="mdi-youtube-tv" />
      </div>
      <div class="row">
        <div class="col-12">
          <div class="flex items-center justify-center q-mb-xs">
            <b class="text-grey playlist-name ellipsis">{{ user }}</b>
          </div>
          <div class="flex items-center justify-center">
            <q-badge color="grey">
              <q-icon name="mdi-clock-outline" />
              <span class="q-ml-sm">{{ time }} segundos</span>
            </q-badge>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BiCardPlaylist',
  props: {
    name: {
      type: String,
      default: '',
    },
    user: {
      type: String,
      default: '',
    },
    time: {
      type: Number,
      default: 0,
    },
  },
});
</script>
<style lang="scss" scoped>
.card-playlist {
  border-radius: 4px $i;
  border: 1px solid #e4e4e4;
  .playlist-name {
    max-width: 70px;
  }
}
</style>
