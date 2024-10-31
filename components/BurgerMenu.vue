<script setup lang="ts">
const isOpen = ref(false);
</script>

<template>
  <div class="p-4 md:p-0 flex justify-end">
    <UButton class="md:hidden" label="Open" @click="isOpen = true" color="gray">
      <UIcon class="w-5 h-5" name="iconamoon:menu-burger-horizontal-thin" />
    </UButton>

    <USlideover v-model="isOpen">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Beth habad planning
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
        <div class="p-4 flex-1">
          <nav class="h-full flex flex-col justify-center">
            <ul class="flex flex-col gap-6">
              <li>
                <ULink to="/" active-class="text-primary">Planning</ULink>
              </li>
              <li>
                <ULink to="/dates" active-class="text-primary">Dates</ULink>
              </li>
              <li>
                <ULink to="/users" active-class="text-primary"
                  >Utilisateurs
                </ULink>
              </li>
              <li>
                <UButton @click="onLogout">Se déconnecter</UButton>
              </li>
            </ul>
          </nav>
        </div>
      </UCard>
    </USlideover>
  </div>
</template>

<style scoped></style>
