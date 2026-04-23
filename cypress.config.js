import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  component: {
  supportFile: "cypress/support/component.js",
},

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
