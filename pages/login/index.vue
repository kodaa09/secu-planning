<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const supabase = useSupabaseClient();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Must be at least 4 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password,
  });

  if (data) {
    navigateTo("/");
  }
}

definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="container mx-auto flex flex-col justify-center h-full">
    <UCard class="w-[320px] sm:w-[620px] mx-auto">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit">Connexion</UButton>
      </UForm>
    </UCard>
  </div>
</template>
