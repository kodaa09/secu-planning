<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from "v-calendar";
import type {
  DatePickerDate,
  DatePickerRangeObject,
} from "v-calendar/dist/types/src/use/datePicker";
import "v-calendar/dist/style.css";

const props = defineProps({
  modelValue: {
    type: [Date, Object] as PropType<
      DatePickerDate | DatePickerRangeObject | null
    >,
    default: null,
  },
  mode: String,
});
const emit = defineEmits(["update:model-value", "close"]);

const rules = ref({
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
});

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:model-value", value);
    emit("close");
  },
});

const attrs = {
  transparent: true,
  borderless: true,
  color: "primary",
  "is-dark": { selector: "html", darkClass: "dark" },
  "first-day-of-week": 2,
};
</script>

<template>
  <VCalendarDatePicker
    v-model="date"
    v-bind="{ ...attrs, ...$attrs }"
    :mode="mode"
    is24hr
    @dayclick="
      (_, event) => {
        event.target.blur();
      }
    "
  />
</template>
