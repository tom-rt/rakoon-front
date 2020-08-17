<template>
  <!-- <div class="flex flex-col h-full items-center"> -->
  <!-- <div class="flex justify-center"> -->
  <div class="flex justify-center">
    <div class="flex items-center w-full max-w-xs">
      <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="flex w-100 justify-center text-xl mb-4 font-bold">Login</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >Log in</button>
          <nuxt-link
            to="/subscribe"
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >No account?</nuxt-link>
          <!-- <div>
            No account yet ?
            <nuxt-link to="/subscribe" :prefetch="true">Create an account</nuxt-link>
          </div>-->
        </div>
      </form>
    </div>
    <!-- </div> -->
  </div>
  <!--</div>-->
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  data() {
    return {
      formError: null,
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const login = await this.$axios.post("/user/login", {
          name: this.username,
          password: this.password
        });
        if (login.status == 200) {
          this.$store.commit("login", {
            token: login.data.token,
            userId: login.data.userId
          });
          this.$router.push("/home");
        }
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>

<style>
</style>