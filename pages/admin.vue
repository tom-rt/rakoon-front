<template>
  <div class="flex flex-row w-full h-full flex-wrap p-4">
    <div class="text-3xl font-extrabold pb-4">Utilisateurs</div>
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-700">
          <tr>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
            >
              Id
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
            >
              Nom
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
            >
              Reauth
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
            >
              Crée le
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
            >
              Dernière connexion
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
            >
              Archivé le
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
            >
              Admin
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-bind:class="{ 'bg-gray-300': users.indexOf(user) % 2 == 1 }"
            v-for="(user, idx) in users"
            :key="idx"
          >
            <td
              class="px-6 py-4 whitespace-no-wrap text-center text-sm leading-5"
            >
              {{ user.id }}
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap text-center text-sm leading-5"
            >
              {{ user.name }}
            </td>
            <td
              v-bind:class="{
                'text-green-500': user.reauth,
                'text-red-500': !user.reauth
              }"
              class="font-extrabold px-6 py-4 whitespace-no-wrap text-center text-sm leading-5"
            >
              {{ user.reauth }}
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap text-center text-sm leading-5"
            >
              {{ user.created_on }}
            </td>
            <td
              class="px-6 py-4 whitespace-no-wrap text-center text-sm leading-5"
            >
              {{ user.last_login }}
            </td>
            <td
              v-if="user.archived_on.Valid"
              class="px-6 py-4 whitespace-no-wrap text-center text-sm leading-5"
            >
              {{ user.archived_on.Time }}
            </td>
            <td
              v-if="!user.archived_on.Valid"
              class="px-6 py-4 whitespace-no-wrap text-center text-sm leading-5"
            >
              null
            </td>
            <td
              v-bind:class="{
                'text-green-500': user.is_admin,
                'text-red-500': !user.is_admin
              }"
              class="font-extrabold px-6 py-4 whitespace-no-wrap text-center text-sm leading-5"
            >
              {{ user.is_admin }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
var dayjs = require("dayjs");

export default {
  async asyncData(context) {
    const req = await context.app.$axios.get(`/list/users`, {});
    for (let i = 0; i < req.data.length; i++) {
      req.data[i].created_on = dayjs(req.data[i].created_on).format(
        "DD/MM/YYYY HH:mm"
      );
      req.data[i].last_login = dayjs(req.data[i].last_login).format(
        "DD/MM/YYYY HH:mm"
      );
      req.data[i].archived_on.Time = dayjs(req.data[i].archived_on.Time).format(
        "DD/MM/YYYY HH:mm"
      );
    }
    console.log(req.data);
    return {
      users: req.data
    };
  },
  middleware: "adminAuthenticated",
  methods: {}
};
</script>

<style></style>