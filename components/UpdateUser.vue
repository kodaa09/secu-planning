<script setup lang="ts">
import { z } from "zod";

const modal = useModal();

const schema = z.object({
  firstname: z.string().min(4),
  lastname: z.string().min(4),
});

type Schema = z.output<typeof schema>;

const props = defineProps({ id: Number });
const emits = defineEmits(["success"]);

const state = reactive({
  firstname: "",
  lastname: "",
});

onMounted(async () => {
  await affectFormValue();
});

async function affectFormValue() {
  if (!props.id) return;

  const { user, error } = await useUser().fetchUser(props.id);

  if (user) {
    state.firstname = user.firstname;
    state.lastname = user.lastname;
  }
}

async function onUpdateUser() {
  if (!props.id) return;

  const { data, error } = await useUser().updateUser(state, props.id);
  await onSuccess();
}

async function onSuccess() {
  emits("success");
  await modal.close();
}
</script>

<template>
  <UModal>
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
            Modifier l'utilisateur
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="modal.close()"
          />
        </div>
      </template>
      <div>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onUpdateUser"
        >
          <UFormGroup label="Nom" name="lastname">
            <UInput v-model="state.lastname" />
          </UFormGroup>

          <UFormGroup label="Prénom" name="firstname">
            <UInput v-model="state.firstname" />
          </UFormGroup>

          <UButton type="submit">Modifier l'utilisateur</UButton>
        </UForm>
      </div>
    </UCard>
  </UModal>
</template>
