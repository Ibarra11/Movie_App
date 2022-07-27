import { defineConfig } from "cypress";
import seed from "./prisma/seed";
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      on("task", {
        "db:seed": () => {
          return seed();
        },
      });
    },
  },
});
