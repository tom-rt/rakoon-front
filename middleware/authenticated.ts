// If the user is not authenticated
export default function ({ app, store, redirect }) {
    const token = store.state.token;

    if (!token) {
        const cookieToken = app.$cookies.get('token');
        if (!cookieToken) {
            return redirect('/login');
        }

        const payload = cookieToken.split(".")[1];
        const decodedPayload = Buffer.from(payload, 'base64').toString();
        const jsonPayload = JSON.parse(decodedPayload);

        store.commit('login', {
            userId: jsonPayload.id,
            token: cookieToken
        })
    }
}