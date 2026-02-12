import type { NextRequest } from "next/server"
import { fetchGitHubStats } from "../lib/github-service"
import { renderStatsCard } from "../lib/render-service"

export const runtime = "edge"

/**
 * Main entry point for SVG generation
 * Flow: Parse params -> Fetch data -> Render SVG -> Return response
 */
export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get("username")

    // Validate input
    if (!username) {
      return new Response("Missing username parameter", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      })
    }

    // Fetch GitHub stats
    const stats = await fetchGitHubStats(username)

    // Render SVG using satori
    const svg = await renderStatsCard(stats, username)

    // Return SVG with cache headers
    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=14400", // 4 hours
      },
    })
  } catch (error) {
    console.error("Error generating SVG:", error)

    // Return error SVG
    const errorSvg = `
      <svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="120" fill="#ff4444" rx="10"/>
        <text x="200" y="60" text-anchor="middle" fill="white" font-family="Arial" font-size="16">
          Error: ${error instanceof Error ? error.message : "Unknown error"}
        </text>
      </svg>
    `

    return new Response(errorSvg, {
      status: 500,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache",
      },
    })
  }
}
