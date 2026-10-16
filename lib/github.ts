import { profile } from "./data.ts";

export type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  updated_at: string;
  pushed_at: string;
  topics: string[];
};

export const selectRepos = (repos: Repo[]): Repo[] =>
  repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));

/**
 * Fetch the user's public repos, most recently pushed first.
 * Token is read server-side only (GITHUB_TOKEN) to raise the rate limit;
 * unauthenticated requests still work but are limited to 60/hour per IP.
 * Cached for 1 hour via Next's fetch cache to stay well under GitHub limits.
 */
export const getRepos = async (): Promise<Repo[]> => {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(
    `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) return [];

  return selectRepos((await res.json()) as Repo[]);
};
