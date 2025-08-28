import type { Language, Repo } from "./types";

export async function getRepos() {
  const file = Bun.file("src/assets/data.json");
  let repos: Repo[] = await file.json().catch((error) => {
    console.error("Error reading local data.json:", error);
  });
  if (repos.length <= 0 || file.lastModified < Date.now() - 86400000) {
    repos = await fetch(
      "    https://api.github.com/users/Jasdeep-Dhillon/repos"
    )
      .then(async (response) => await response.json())
      .catch((error) => {
        console.error("Error fetching projects:", error);
        return { json: () => [] }; // Return an empty array on error
      });
    file.write(JSON.stringify(repos));
    console.log("Fetched from API");
  }
  return repos;
}

export async function getInfo(project: string) {
  const repos = await getRepos();
  const info = repos.find((repo) => repo.name === project);
  if (!info) {
    return await fetch(
      `https://api.github.com/repos/Jasdeep-Dhillon/${project}`
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }
  return info;
}

export async function getLanguages(project: string, url: string) {
  if (!url) return [];
  const file = Bun.file("src/assets/languages.json");
  const data = await file.json().catch((error) => {
    console.error("Error reading local languages.json:", error);
  });
  console.log(data);
  let languages = data.find(
    (lang: { name: string }) => lang.name === project
  )?.languages;
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
