export default ({ $axios, store, redirect }) => {
   $axios.onRequest(config => {
      config.headers['Authorization'] = 'Bearer ' + store.state.token;
   })

   $axios.onResponseError(async err => {
      if (err.response && err.response.status == 401 && err.response.data.message == "Token expired.") {
         const refresh = await $axios.post('/refresh/token')
         if (refresh.status == 200) {
            let originalRequest = err.config;
            originalRequest.headers['Authorization'] = 'Bearer ' + refresh.data.token;
            store.commit('setToken', {
               token: refresh.data.token,
            })
            return $axios(originalRequest);
         } else {
            store.commit('logout')
            redirect("/login")
         }
      } else {
         return err
      }
   })
}
