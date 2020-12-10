import Vue from "vue";
import { WritableStream } from "web-streams-polyfill/ponyfill";
import * as streamSaver from "streamsaver";

Vue.mixin({
  methods: {
    async streamSave(fileName, response) {

      if (!window.WritableStream) {
        streamSaver.WritableStream = WritableStream;
        window.WritableStream = WritableStream;
      }

      const fileStream = streamSaver.createWriteStream(fileName);
      // const readableStream = response.body;

      // more optimized
      // if (readableStream.pipeTo) {
      //   return readableStream
      //     .pipeTo(fileStream)
      //     .then(() => console.log("done writing"));
      // }

      window.writer = fileStream.getWriter();

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
