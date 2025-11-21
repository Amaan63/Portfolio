import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch total contributions from external API
    const res = await fetch("https://github-contributions-api.jogruber.de/v4/Amaan63", {
      next: { revalidate: 43200 }, // Cache for 12 hours
    });

    if (!res.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    const data = await res.json();

    // Calculate total commits by summing up all years in the "total" object
    // The API returns: "total": { "2024": 38, "2025": 2021, ... }
    const totalCommits = Object.values(data.total).reduce((acc: number, curr: any) => acc + curr, 0);

    return NextResponse.json({ commits: totalCommits });
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return NextResponse.json({ commits: 0 }, { status: 500 });
  }
}
