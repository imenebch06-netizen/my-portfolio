export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
  demo?: string | null;
  icon: string;
  cover?: string;
  /** True when using a curated fallback cover (no real screenshot available). */
  coverFallback?: boolean;
}