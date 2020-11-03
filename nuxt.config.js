export default {
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/axios", "cookie-universal-nuxt"],
  axios: {
    baseURL: "https://api.rakoon.tech:443/v1",
  },
  plugins: ["~/plugins/axios.ts", "~/plugins/click-outside.ts"],
  css: [{ src: "~assets/css/style.css", lang: "css" }],
  buildDir: 'dist',
  build: {
    additionalExtensions: ["ts", "tsx"],
  },
};
