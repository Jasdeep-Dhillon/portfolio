import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import type { Language, Repo } from "./types";
export async function getRepos() {
  const file = "src/assets/data.json";
  if (!existsSync(file)) {
    writeFileSync(file, "[]");
  }
  let repos: Repo[] = JSON.parse(readFileSync(file, "utf-8"));

  if (repos.length <= 0 || statSync(file).mtimeMs <= Date.now() - 86400000) {
    repos = await fetch("https://api.github.com/users/Jasdeep-Dhillon/repos")
      .then(async (response) => await response.json())
      .catch((error) => {
        console.error("Error fetching projects:", error);
        return { json: () => [] };
      });
    writeFileSync(file, JSON.stringify(repos));
    console.log("Fetched from API");
  }
  return repos;
}

export async function getInfo(project: string) {
  const repos = await getRepos();
  const info = repos.find((repo) => repo.name === project);
  if (!info) {
    return await fetch(
      `https://api.github.com/repos/Jasdeep-Dhillon/${project}`,
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }
  return info;
}

export async function getLanguages(project: string, url: string) {
  // if (!url) return [];
  const file = "src/assets/languages.json";

  if (!existsSync(file)) {
    writeFileSync(file, "[]");
  }
  const data = JSON.parse(readFileSync(file, "utf-8")) ?? [];
  console.log("Data: ", data);

  let languages: Language = data.find(
    (repo: { name: string }) => repo.name === project,
  )?.languages;
  if (!languages) {
    console.log("No data");
    languages = await fetch(url)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    data.push({ name: project, languages });
    writeFileSync(file, JSON.stringify(data));
  }
  return languages;
}

export async function getReadme(repo: Repo) {
  const file = `src/readme/${repo.name}.md`;
  if (!existsSync(file)) {
    const response = await fetch(
      `https://raw.githubusercontent.com/Jasdeep-Dhillon/${repo.name}/refs/heads/${repo.default_branch}/README.md`,
    );
    if (response.status === 404) {
      writeFileSync(file, "");
    } else {
      writeFileSync(file, await response.text());
    }
  }
  return readFileSync(file);
}
