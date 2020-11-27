import Vue from "vue";
import { WritableStream } from "web-streams-polyfill/ponyfill";
import streamSaver from "streamsaver";

Vue.mixin({
  methods: {
    streamSave(fileName, response) {
      if (!window.WritableStream) {
        streamSaver.WritableStream = WritableStream;
        window.WritableStream = WritableStream;
      }

      const fileStream = streamSaver.createWriteStream(fileName);
      const readableStream = response.body;

      // more optimized
      if (readableStream.pipeTo) {
        return readableStream
          .pipeTo(fileStream)
          .then(() => console.log("done writing"));
      }

      window.writer = fileStream.getWriter();

      const reader = response.body.getReader();
      const pump = () =>
        reader
          .read()
          .then((res) =>
            res.done ? writer.close() : writer.write(res.value).then(pump)
          );

      pump();
    },
  },
});
