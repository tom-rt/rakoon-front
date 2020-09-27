export const state = () => ({
    token: null,
    userId: null,
    isAdmin: false,
    isConnected: false
})

export const getters = {
    getToken: state => {
        return state.token
    },
    getIsAdmin: state => {
        return state.isAdmin
    }
}

export const mutations = {
    login(state, payload) {
        state.userId = payload.userId;
        state.isAdmin = payload.isAdmin;
        state.token = payload.token;
        state.isConnected = true;
        this.$cookies.set('token', state.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "none",
            secure: true
        })
    },
    setToken(state, payload) {
        state.token = payload.token;
        state.isConnected = true;
        this.$cookies.set('token', state.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "none",
            secure: true
        })
    },
    setStoreToken(state, payload) {
        state.token = payload.token;
    },
    logout(state) {
        state.userId = null;
        state.token = null;
        state.isAdmin = false;
        state.isConnected = false;
        this.$cookies.remove('token')
    }
}