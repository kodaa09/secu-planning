<script setup lang="ts">
const supabase = useSupabaseClient();

const onLogout = async () => {
  let { error } = await supabase.auth.signOut();
  if (!error) navigateTo("/login");
};
</script>

<template>
  <header class="mb-14">
    <nav
      class="hidden container mx-auto md:flex items-center justify-between py-6"
    >
      <div>
        <h1 class="text-xl">Beth habad securité</h1>
      </div>
      <ul class="flex items-center gap-8">
        <li>
          <ULink to="/" active-class="text-primary">Planning</ULink>
        </li>
        <li>
          <ULink to="/dates" active-class="text-primary">Dates</ULink>
        </li>
        <li>
          <ULink to="/users" active-class="text-primary">Utilisateurs</ULink>
        </li>
        <li>
          <UButton @click="onLogout">Se déconnecter</UButton>
        </li>
      </ul>
    </nav>
    <BurgerMenu />
    <UDivider></UDivider>
  </header>
</template>

<style scoped></style>
