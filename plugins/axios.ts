export default ({ $axios, store, redirect }) => {
   $axios.onRequest(config => {
      config.headers['Authorization'] = 'Bearer ' + store.state.token;
   })

   $axios.onResponseError(async err => {
      console.log("HELLO", err.response, err.response.status, err.response.data.message)
      if (err.response && err.response.status == 401 && err.response.data.message == "Token expired.") {
         console.log("ICI")
         const refresh = await $axios.post('/refresh/token')
         if (refresh.status == 200) {
            console.log("QWERT")
            let originalRequest = err.config;
            originalRequest.headers['Authorization'] = 'Bearer ' + refresh.data.token;
            this.$store.commit('setToken', {
               token: refresh.data.token,
            })
            return $axios(originalRequest);
         } else {
            console.log("LA")
            this.$store.commit('logout')
            redirect("/login")
         }
      } else {
         return err
      }
   })
}
