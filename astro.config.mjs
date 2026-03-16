import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";

import icon from "astro-icon";

export default defineConfig({
  server: {
    port: 4000,
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Pixelify Sans",
      cssVariable: "--font-pixelify",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Google Sans Flex",
      cssVariable: "--font-google-sans",
    },
  ],

  trailingSlash: "never",

  env: {
    schema: {
      PORT: envField.number({
        context: "server",
        access: "secret",
        default: 3000,
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    icon({
      iconDir: "src/assets/icons",
    }),
  ],
});
