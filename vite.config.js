// vite.config.js
const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        playingCards: resolve(__dirname, "playing-cards/index.html"),
      },
    },
  },
});
