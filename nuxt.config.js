export default {
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/axios", "cookie-universal-nuxt"],
  axios: {
    baseURL: "http://5.135.165.57:8081/v1",
  },
  plugins: ["~/plugins/axios.ts", "~/plugins/click-outside.ts"],
  css: [{ src: "~assets/css/style.css", lang: "css" }],
  buildDir: 'dist',
  build: {
    additionalExtensions: ["ts", "tsx"],
  },
};
