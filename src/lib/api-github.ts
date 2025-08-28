import type { Language, Repo } from "./types";

export async function getRepos() {
  if (import.meta.env.DEV) {
    const file = Bun.file("src/assets/data.json");
    console.log(file.lastModified )
    const repos: Repo[] = await file.json().catch((error) => {
      console.error("Error reading local data.json:", error);
    });
    return repos;
  }
  const repos: Repo[] = await fetch(
    "    https://api.github.com/users/Jasdeep-Dhillon/repos"
  )
    .then(async (response) => await response.json())
    .catch((error) => {
      console.error("Error fetching projects:", error);
      return { json: () => [] }; // Return an empty array on error
    });
  return repos;
}

export async function getInfo(project: string) {
  if (import.meta.env.DEV) {
    const repos = await getRepos();
    return repos.find((repo) => repo.name === project);
  }
  const info = await fetch(
    `https://api.github.com/repos/Jasdeep-Dhillon/${project}`
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return info;
}

export async function getLanguages(project: string, url: string) {
  if (import.meta.env.DEV) {
    const file = Bun.file("src/assets/languages.json");
    const data = await file.json().catch((error) => {
      console.error("Error reading local languages.json:", error);
    });
    console.log(data);
    let languages = data.find((lang: { name: string }) => lang.name === project)?.languages;
    if (!languages) {
      console.log("No data");
      languages = await fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error(err));
      data.push({ name: project, languages });
      await file.write(JSON.stringify(data));
    }
    return languages;
  }
  const languages: Language = await fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}
