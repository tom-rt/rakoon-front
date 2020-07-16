export default {
    modules: [
        '@nuxtjs/axios',
        'cookie-universal-nuxt'
    ],
    axios: {
        baseURL: 'http://localhost:8081/v1'
    },
    plugins: [
        '~/plugins/axios.ts'
    ],
    build: {
        additionalExtensions: ['ts', 'tsx'],
    }
}