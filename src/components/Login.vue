<template>
  <div class="login">
    <div class="elem">
      user:
      <input v-model="user" />
    </div>
    <div class="elem">
      password:
      <input v-model="password" />
    </div>
    <div>
      <button v-on:click="subscribe()">Subscribe</button>
    </div>
    <div>
      <button v-on:click="connect()">Connect</button>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/apiService.ts";

export default {
  name: "login",
  components: {},
  data() {
    return {
      user: null,
      password: null,
      apiService: new ApiService()
    };
  },
  methods: {
    connect: async function() {
      const toto = await this.apiService.connect(this.user, this.password);
      console.log(toto);
    },
    subscribe: async function() {
      const toto = await this.apiService.subscribe(this.user, this.password);
      console.log(toto);
    }
  }
};
</script>

<style>
.elem {
  width: 10%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
