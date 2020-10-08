<template>
  <div class="flex flex-row w-full flex-wrap p-4">
    <div class="flex flew-wrap items-start mb-4">
      <div class="text-2xl font-extrabold w-auto mr-4">Utilisateurs</div>
      <button
        v-if="!createUserOpen"
        v-on:click="createUserOpen = true"
        class="bg-blue-500 hover:bg-blue-700 text-white font-black py-2 px-4 rounded"
      >
        Créer utilisateur
      </button>
      <button
        v-if="createUserOpen"
        v-on:click="createUser()"
        class="bg-blue-500 hover:bg-blue-700 text-white font-black py-2 px-4 rounded mr-1"
      >
        V
      </button>
      <button
        v-if="createUserOpen"
        v-on:click="clearUserCreation()"
        class="bg-red-500 hover:bg-red-700 text-white font-black py-2 px-4 rounded mr-1"
      >
        X
      </button>
      <input
        v-model="newUserName"
        v-if="createUserOpen"
        v-bind:class="{ 'border-red-500': invalidNewUserName }"
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-1"
        type="text"
        placeholder="Nom"
      />
      <input
        v-model="newUserPassword"
        v-if="createUserOpen"
        v-bind:class="{ 'border-red-500': invalidNewUserPassword }"
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        placeholder="Mot de passe"
      />
    </div>
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-700">
          <tr>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider font-extrabold"
            >
              Id
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider font-extrabold"
            >
              Nom
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider font-extrabold"
            >
              Reauth
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider font-extrabold"
            >
              Crée le
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider font-extrabold"
            >
              Dernière connexion
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider font-extrabold"
            >
              Archivé le
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider font-extrabold"
            >
              Admin
            </th>
            <th></th>
            <th></th>
            <th></th>
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
            <td>
              <div class="flex flex-wrap">
                <button
                  v-if="editPassword != user.id"
                  v-on:click="editPassword = user.id"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-black py-2 px-4 rounded"
                >
                  Modifier mdp
                </button>
                <button
                  v-if="editPassword == user.id"
                  v-on:click="updateUserPassword(user.id)"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-black py-2 px-4 rounded mr-1"
                >
                  V
                </button>
                <button
                  v-if="editPassword == user.id"
                  v-on:click="clearPasswordEdit()"
                  class="bg-red-500 hover:bg-red-700 text-white font-black py-2 px-4 rounded mr-1"
                >
                  X
                </button>
                <input
                  v-model="newPassword"
                  v-if="editPassword == user.id"
                  v-bind:class="{ 'border-red-500': invalidPassword }"
                  class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Mot de passe"
                />
              </div>
            </td>
            <td>
              <button
                v-on:click="archiveUser(user.id)"
                class="bg-red-500 hover:bg-red-700 text-white font-black py-2 px-4 rounded"
              >
                Archiver
              </button>
            </td>
            <td>
              <button
                v-on:click="deleteUser(user.id)"
                class="bg-red-500 hover:bg-red-700 text-white font-black py-2 px-4 rounded"
              >
                Supprimer
              </button>
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
    return {
      users: req.data,
      newPassword: "",
      newUserPassword: "",
      newUserName: "",
      editPassword: -1,
      invalidPassword: false,
      invalidNewUserName: false,
      invalidNewUserPassword: false,
      createUserOpen: false
    };
  },
  middleware: "adminAuthenticated",
  methods: {
    async archiveUser(userId) {
      const req = await this.$axios.put(`/user/${userId}/archive`, {});
      this.refreshUserList();
    },
    async deleteUser(userId) {
      const req = await this.$axios.delete(`/user/${userId}`, {});
      this.refreshUserList();
    },
    async createUser() {
      this.invalidNewUserName = this.newUserName.length == 0 ? true : false;
      this.invalidNewUserPassword =
        this.newUserPassword.length == 0 ? true : false;

      if (!this.invalidNewUserName && !this.invalidNewUserPassword) {
        const req = await this.$axios.post(`/user`, {
          name: this.newUserPassword,
          password: this.newUserPassword
        });
        this.clearUserCreation();
        this.refreshUserList();
      }
    },
    async updateUserPassword(userId) {
      if (this.newPassword.length == 0) {
        this.invalidPassword = true;
      } else {
        const req = await this.$axios.put(`/user/${userId}/password`, {
          password: this.newPassword
        });
        this.clearPasswordEdit();
        this.refreshUserList();
      }
    },
    async refreshUserList() {
      const req = await this.$axios.get(`/list/users`, {});
      for (let i = 0; i < req.data.length; i++) {
        req.data[i].created_on = dayjs(req.data[i].created_on).format(
          "DD/MM/YYYY HH:mm"
        );
        req.data[i].last_login = dayjs(req.data[i].last_login).format(
          "DD/MM/YYYY HH:mm"
        );
        req.data[i].archived_on.Time = dayjs(
          req.data[i].archived_on.Time
        ).format("DD/MM/YYYY HH:mm");
      }
      this.users = req.data;
    },
    clearPasswordEdit() {
      this.editPassword = -1;
      this.newPassword = "";
      this.invalidPassword = false;
    },
    clearUserCreation() {
      this.createUserOpen = false;
      this.invalidNewUserName = false;
      this.invalidNewUserPassword = false;
      this.newUserName = "";
      this.newUserPassword = "";
    }
  }
};
</script>

<style></style>