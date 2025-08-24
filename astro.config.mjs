import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  //PRODUCCION
// site: "https://juamaya.github.io/web-astro-avanzado", // 👈 URL completa
//  base: "/web-astro-avanzado/",

  //DESARROLLO
   site: "https://localhost:4321",
  integrations: [
    tailwind(),
    icon({
      include: {
        lucide: ["*"],
      },
    }),
    sitemap(),
  ],
});
