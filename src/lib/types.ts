export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  forks_url: string;
  homepage: string | null;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  watchers: number;
  forks: number;
  open_issues: number;
  languages_url: string;
  topics: string[];
}

export interface Language {
  [key: string]: number;
}
