import Vue from "vue";
import { WritableStream } from "web-streams-polyfill/ponyfill";
import * as streamSaver from "streamsaver";

Vue.mixin({
  methods: {
    async streamSave(fileName, fullPath, token) {

      var url = new URL("https://api.rakoon.tech:443/v1/file");
      var params = { path: fullPath };
      url.search = new URLSearchParams(params).toString();

      if (!window.WritableStream) {
        streamSaver.WritableStream = WritableStream;
        window.WritableStream = WritableStream;
      }
      const fileStream = streamSaver.createWriteStream(fileName);
      window.writer = fileStream.getWriter();

      const response = await fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token,
        }),
      });

      const reader = response.body.getReader();

      const pump = async () => {
        const res = await reader.read()
        if (res.done) {
          window.writer.close();
        } else {
          await window.writer.write(res.value);
          pump();
        }
      }

      pump();
    }
  },
});
