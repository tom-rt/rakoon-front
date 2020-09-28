<template>
  <div class="flex flex-row w-full h-full flex-wrap p-4">
    <div class="text-3xl font-extrabold">Utilisateurs</div>
    <!-- {{ users }} -->
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Id
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Reauth
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Cree le
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Derniere connexion
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Archive le
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              Admin
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user">
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
              {{ user.id }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
              {{ user.name }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
              {{ user.reauth }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
              {{ user.created_on }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
              {{ user.last_login }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
              {{ user.archived_on }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
              {{ user.is_admin }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const req = await context.app.$axios.get(`/list/users`, {});
    return {
      users: req.data
    };
  },
  middleware: "adminAuthenticated",
  methods: {}
};
</script>

<style></style>