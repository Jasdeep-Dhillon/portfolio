import { getReadme, getRepos } from "./src/lib/api-github.ts";
import type { Repo } from "./src/lib/types.ts";

const repos: Repo[] = await getRepos();
await Promise.all(
  repos.map(async (repo) => {
    return await getReadme(repo);
  }),
);
