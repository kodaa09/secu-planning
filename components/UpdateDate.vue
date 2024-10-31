<script setup lang="ts">
import { format, parse } from "date-fns";

const props = defineProps({
  id: Number,
});
const emits = defineEmits(["update-date"]);

const isOpen = ref(false);
const day = ref(new Date());
const start = ref(new Date());
const end = ref(new Date());
const userList = ref<User[] | null>([]);
const userId = ref<number | undefined>(undefined);

const formattedUserList = computed(() => {
  return userList.value
    ? userList.value.map((user) => ({
        id: user.id,
        name: `${user.firstname} ${user.lastname}`,
      }))
    : [];
});

onUpdated(async () => {
  if (!props.id) return;

  const { users } = await useUser().fetchUsers();
  userList.value = users;

  const { date } = await useDate().fetchDate(props.id);
  if (date) {
    day.value = parse(date.day, "yyyy-MM-dd", new Date());
    start.value = parse(date.start, "HH:mm:ss", new Date());
    end.value = parse(date.end, "HH:mm:ss", new Date());
    userId.value = date.user_id;
  }
});

async function onUpdateDate() {
  if (!props.id) return;

  const dateFormated = {
    day: format(new Date(day.value), "yyyy-MM-dd"),
    start: format(new Date(start.value), "HH:mm:ss"),
    end: format(new Date(end.value), "HH:mm:ss"),
    userId: userId.value,
  };

  const { data, error } = await useDate().updateDate(dateFormated, props.id);
  console.log(data);
  emits("update-date");
  isOpen.value = false;
}
</script>

<template>
  <div>
    <UButton class="w-full" label="Modifier" @click="isOpen = true" />

    <UModal v-model="isOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Modifier la date
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-8">
            <div>
              <p class="text-xs mb-1">Choix du jour</p>
              <UPopover class="w-4/12" :popper="{ placement: 'bottom-start' }">
                <UButton
                  icon="i-heroicons-calendar-days-20-solid"
                  :label="format(day, 'd MMM, yyy')"
                />

                <template #panel>
                  <DatePicker mode="date" v-model="day" is-required />
                </template>
              </UPopover>
            </div>

            <div>
              <p class="text-xs mb-1">Heure de début</p>
              <UPopover class="w-4/12" :popper="{ placement: 'bottom-start' }">
                <UButton
                  icon="i-heroicons-calendar-days-20-solid"
                  :label="format(day, 'd MMM, yyy')"
                />

                <template #panel>
                  <DatePicker mode="time" v-model="start" is-required />
                </template>
              </UPopover>
            </div>

            <div>
              <p class="text-xs mb-1">Heure de fin</p>
              <UPopover class="w-4/12" :popper="{ placement: 'bottom-start' }">
                <UButton
                  icon="i-heroicons-calendar-days-20-solid"
                  :label="format(day, 'd MMM, yyy')"
                />

                <template #panel>
                  <DatePicker mode="time" v-model="end" is-required />
                </template>
              </UPopover>
            </div>
          </div>

          <div>
            <p class="text-xs mb-1">Séléctionner une personne</p>
            <USelectMenu
              v-model="userId"
              :options="formattedUserList"
              value-attribute="id"
              option-attribute="name"
              class="w-12/12 pb-4"
            />
          </div>

          <UButton @click="onUpdateDate" block>Modifier la date</UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
