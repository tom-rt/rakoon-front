// If the user is not authenticated
export default function ({ app, store, redirect }) {
    const token = store.state.token;

    if (!token) {
        const cookieToken = app.$cookies.get('token')
        const currentRoute = app.context.route.name

        // If the token is not present in the store, but is present in the cookie
        // It happens if the user closes the window and reopens it for example
        if (!cookieToken) {
            if (currentRoute != "login" && currentRoute != "subscribe") {
                return redirect('/login')
            }
        } else {

            const payload = cookieToken.split(".")[1]
            const decodedPayload = Buffer.from(payload, 'base64').toString()
            const jsonPayload = JSON.parse(decodedPayload)

            store.commit('login', {
                userId: jsonPayload.id,
                token: cookieToken
            })

            // If the user is logged in, we redirect him to home
            if (currentRoute == "login" || currentRoute == "subscribe") {
                return redirect("/home")
            }
        }
    }
}