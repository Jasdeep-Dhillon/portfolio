import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const readme = defineCollection({
  loader: glob({
    base: "./src/readme",
    pattern: "**/*.{md,mdx}",
  }),
});

export const collections = { readme };
