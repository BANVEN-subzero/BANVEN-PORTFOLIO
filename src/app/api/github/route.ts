import { NextResponse } from "next/server";
import { profile } from "@/config/profile";

/**
 * Public GitHub repository feed for the portfolio's GitHub section.
 * Cached for 30 minutes to stay well inside GitHub's unauthenticated
 * rate limits. Never fabricates data — on any failure the client shows
 * a graceful fallback linking to the profile.
 */

export type PublicRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
};

export const revalidate = 1800;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.github.username}/repos?sort=updated&per_page=50`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "portfolio-repo-feed",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate },
      }
    );

    if (!res.ok) {
      // 404 → user genuinely has no public repos yet; anything else → upstream trouble
      if (res.status === 404) {
        return NextResponse.json({ repos: [], fetchedAt: new Date().toISOString() });
      }
      return NextResponse.json(
        { repos: null, error: `GitHub API responded with ${res.status}` },
        { status: 200 }
      );
    }

    const raw = (await res.json()) as Array<Record<string, unknown>>;
    const repos: PublicRepo[] = raw
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        name: String(r.name ?? ""),
        html_url: String(r.html_url ?? ""),
        description: (r.description as string | null) ?? null,
        language: (r.language as string | null) ?? null,
        stargazers_count: Number(r.stargazers_count ?? 0),
        forks_count: Number(r.forks_count ?? 0),
        updated_at: String(r.updated_at ?? new Date().toISOString()),
        topics: Array.isArray(r.topics) ? (r.topics as string[]).slice(0, 4) : undefined,
      }))
      .sort((a, b) => {
        // Stars first (real, from the API), then recency
        if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
        return b.updated_at.localeCompare(a.updated_at);
      })
      .slice(0, 6);

    return NextResponse.json({ repos, fetchedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[github] fetch failed:", err);
    return NextResponse.json(
      { repos: null, error: "GitHub request failed" },
      { status: 200 }
    );
  }
}
