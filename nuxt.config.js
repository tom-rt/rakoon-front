import redirectSSL from "redirect-ssl";

export default {
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/axios", "cookie-universal-nuxt"],
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === "production",
    }),
  ],
  axios: {
    baseURL: "https://api.rakoon.tech:443/v1",
    // baseURL: "http://localhost:8081/v1",
  },
  plugins: [
    "~/plugins/axios.ts",
    "~/plugins/clickOutside.ts",
    "~/plugins/streamSaver.client.ts",
  ],
  css: [{ src: "~assets/css/style.css", lang: "css" }],
  buildDir: "dist",
  build: {
    additionalExtensions: ["ts", "tsx"],
    extend(config) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }],
  loading: {
    color: "#80b918",
    height: "2px",
  },
};
