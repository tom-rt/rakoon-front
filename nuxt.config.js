export default {
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/axios", "cookie-universal-nuxt"],
  buildModules: [
    '@aceforth/nuxt-netlify',
  ],
  axios: {
    baseURL: "http://5.135.165.57:8081/v1",
  },
  generate: {
    fallback: true
  },
  plugins: ["~/plugins/axios.ts", "~/plugins/click-outside.ts"],
  css: [{ src: "~assets/css/style.css", lang: "css" }],
  buildDir: 'dist',
  build: {
    additionalExtensions: ["ts", "tsx"],
  },
};
