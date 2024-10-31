<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  firstname: z.string().min(4),
  lastname: z.string().min(4),
});

type Schema = z.output<typeof schema>;

const emit = defineEmits(["add-user"]);

const isOpen = ref(false);
const loading = ref(true);
const state = reactive({
  firstname: "",
  lastname: "",
});

async function onAddUser(event: FormSubmitEvent<Schema>) {
  const { data, error } = await useUser().addUser(state);

  isOpen.value = false;
  loading.value = true;

  emit("add-user");
}
</script>

<template>
  <div>
    <UButton label="Ajouter des utilisateurs" @click="isOpen = true" />
    <UModal v-model="isOpen">
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
              Ajouter un utilisateur
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
        <div>
          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4"
            @submit="onAddUser"
          >
            <UFormGroup label="Nom" name="lastname">
              <UInput v-model="state.lastname" />
            </UFormGroup>

            <UFormGroup label="Prénom" name="firstname">
              <UInput v-model="state.firstname" />
            </UFormGroup>

            <UButton type="submit">Ajouter un utilisateur</UButton>
          </UForm>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
