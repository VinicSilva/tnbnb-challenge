<template>
  <q-input outlined dense v-bind="$attrs" v-model="model">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date :locale="locale" v-model="model" mask="DD/MM/YYYY">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script lang="ts">
import { useTranslate } from 'src/composable/translate';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BiDate',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const { translate } = useTranslate();
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value: string) {
        emit('update:modelValue', value);
      },
    });

    const locale = computed(() => {
      const listDays = [
        translate.value.days.sunday,
        translate.value.days.monday,
        translate.value.days.tuesday,
        translate.value.days.wednesday,
        translate.value.days.thursday,
        translate.value.days.friday,
        translate.value.days.saturday,
      ];

      const listMonths = [
        translate.value.months.january,
        translate.value.months.february,
        translate.value.months.march,
        translate.value.months.april,
        translate.value.months.may,
        translate.value.months.june,
        translate.value.months.july,
        translate.value.months.august,
        translate.value.months.september,
        translate.value.months.october,
        translate.value.months.november,
        translate.value.months.december,
      ];

      return {
        days: listDays,
        daysShort: listDays.map((day) => day.slice(0, 3)),
        months: listMonths,
        monthsShort: listMonths.map((day) => day.slice(0, 3)),
      };
    });

    return { model, locale };
  },
});
</script>
