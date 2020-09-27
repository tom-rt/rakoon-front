// If the user is not authenticated
export default async function ({ app, store, redirect, axios }) {
    const token = store.getters.getToken;
    if (!token) {
        const cookieToken = app.$cookies.get('token')
        if (cookieToken) {
            store.commit('setStoreToken', {
                token: cookieToken
            })
            const refresh = await app.$axios.post('/refresh/token')
            if (refresh.status == 200) {
                store.commit("login", {
                    userId: refresh.data.id,
                    isAdmin: refresh.data.isAdmin,
                    token: cookieToken
                })
                return redirect("/home")
            }
        }
    }
}