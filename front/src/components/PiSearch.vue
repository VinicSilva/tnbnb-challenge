<template>
  <div class="row full-width items-center justify-between pi-search">
    <div class="col">
      <div class="text-h6 title ellipsis">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="col-auto">
      <q-toolbar class="bg-grey-11">
        <div class="row items-center q-col-gutter-x-xs">
          <slot name="before-search" />
          <div class="col" v-if="!hiddenSearch">
            <q-form
              class="form-search"
              @submit.prevent="$emit('search', search)"
            >
              <q-input
                class="input-search"
                v-model="search"
                dense
                type="search"
                bg-color="white"
                outlined
                :placeholder="translate.search"
              >
                <template v-slot:prepend v-if="!search">
                  <q-icon name="search" size="xs" />
                </template>
                <template v-slot:append v-else>
                  <q-btn
                    round
                    size="xs"
                    color="grey"
                    unelevated
                    class="btn-input-search"
                    icon="search"
                    @click="$emit('search', search)"
                  >
                  </q-btn>
                </template>
              </q-input>
            </q-form>
          </div>
          <slot name="btn-before-remove" />
          <div class="col-auto" v-if="!hiddenRemove">
            <q-btn
              icon="mdi-trash-can"
              :disable="disableRemove"
              @click="$emit('remove')"
              size="sm"
              round
            />
          </div>
          <slot name="btn-center" />
          <div class="col-auto" v-if="!hiddenAdd">
            <q-btn
              icon="mdi-plus"
              :disable="disableAdd"
              @click="$emit('add')"
              size="sm"
              round
            />
          </div>
          <slot name="btn-after-add" />
        </div>
      </q-toolbar>
    </div>
  </div>
</template>
<script lang="ts">
import { useTranslate } from 'src/composable/translate';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'PiSearch',
  emits: ['update:modelValue', 'search', 'remove', 'edit','add'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    disableAdd: {
      type: Boolean,
      default: false,
    },
    hiddenAdd: {
      type: Boolean,
      default: false,
    },
    hiddenRemove: {
      type: Boolean,
      default: false,
    },
    disableRemove: {
      type: Boolean,
      default: false,
    },
    hiddenSearch: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { translate } = useTranslate();
    const search = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    return { search, translate };
  },
});
</script>
<style lang="scss" scoped>
.pi-search {
  height: 40 px;
  .title {
    color: #4c4c4c;
  }
  .q-toolbar {
    border-radius: 20px;
  }
  .btn-input-search {
    position: relative;
    left: 7px;
  }
}
</style>

<style lang="scss">
.pi-search {
  .input-search {
    &.q-field--dense .q-field__control {
      border-radius: 40px;
      height: 32px $i;
      align-items: center;
    }
  }
}
</style>
