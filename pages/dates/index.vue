<script setup lang="ts">
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import UpdateDate from "~/components/UpdateDate.vue";

const dateList = ref([]);

onMounted(async () => {
  await loadDates();
});

const formatDates = computed(() => {
  return dateList.value.reduce((formattedDates: any, currentDate: any) => {
    const existingDayIndex = formattedDates.findIndex(
      (item: any) => item.day === currentDate.day,
    );

    if (existingDayIndex !== -1) {
      formattedDates[existingDayIndex].hours.push({
        id: currentDate.id,
        start: currentDate.start,
        end: currentDate.end,
        userId: currentDate.user_id,
        firstname: currentDate.User.firstname,
        lastname: currentDate.User.lastname,
      });
    } else {
      formattedDates.push({
        day: currentDate.day,
        hours: [
          {
            id: currentDate.id,
            start: currentDate.start,
            end: currentDate.end,
            userId: currentDate.user_id,
            firstname: currentDate.User.firstname,
            lastname: currentDate.User.lastname,
          },
        ],
      });
    }

    return formattedDates;
  }, []);
});

async function loadDates() {
  const { dates, error } = await useDate().fetchDates();

  if (dates) {
    dateList.value = dates;
  }
}

async function onDeleteDate(id: number) {
  await useDate().deleteDate(id);
  await loadDates();
}
</script>

<template>
  <div class="flex items-center justify-between mb-14">
    <h1 class="text-2xl">Gestion des dates</h1>
    <AddDate @update-date="loadDates" />
  </div>

  <div>
    <UCard class="mb-14" v-for="date in formatDates" :key="date.id">
      <h2 class="mb-10 text-2xl">
        {{ format(date.day, "d MMMM yyy", { locale: fr }) }}
      </h2>
      <div v-for="(time, index) in date.hours">
        <div
          class="flex-col sm:flex-row flex sm:items-center justify-between my-5"
        >
          <p>{{ time.firstname }} {{ time.lastname }}</p>
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <p>
              {{ time.start.split(":").slice(0, 2).join(":") }} -
              {{ time.end.split(":").slice(0, 2).join(":") }}
            </p>
            <UpdateDate :id="time.id" @update-date="loadDates" />
            <UButton color="red" @click="onDeleteDate(time.id)">
              Supprimer
            </UButton>
          </div>
        </div>
        <UDivider
          v-if="date.hours.length > 1 && index !== date.hours.length - 1"
        ></UDivider>
      </div>
    </UCard>
  </div>
</template>
