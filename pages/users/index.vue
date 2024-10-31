<script setup lang="ts">
import UpdateUser from "~/components/UpdateUser.vue";

const modal = useModal();
const peoples = ref([]);
const loading = ref(true);

onMounted(async () => {
  await loadUsers();
});

async function loadUsers() {
  const { users, error } = await useUser().fetchUsers();

  if (users && users.length > 0) peoples.value = users;

  loading.value = false;
}

const columns = [
  {
    key: "id",
    label: "Id",
  },
  {
    key: "lastname",
    label: "Nom",
  },
  {
    key: "firstname",
    label: "Prénom",
  },
  {
    key: "actions",
  },
];

const items = (row: any) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        modal.open(UpdateUser, {
          id: row.id,
          onSuccess() {
            loadUsers();
          },
        });
      },
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: async () => {
        console.log(row.id);
        await useUser().deleteUser(row.id);
        await loadUsers();
      },
    },
  ],
];
const selected = ref([peoples[1]]);
</script>

<template>
  <div class="flex items-center justify-between mb-14">
    <h1 class="text-2xl">Gestion des utilisateurs</h1>
    <AddUser @add-user="loadUsers" />
  </div>
  <UTable
    :rows="peoples"
    :columns="columns"
    :loading="loading"
    :loading-state="{
      icon: 'i-heroicons-arrow-path-20-solid',
      label: 'Loading...',
    }"
  >
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
  </UTable>
</template>
