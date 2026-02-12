import { type NextRequest, NextResponse } from "next/server"
import { fetchGitHubStats } from "@/lib/github-service"
import { renderStatsCard, renderErrorCard } from "@/lib/render-service"
import { parseQueryParams } from "@/lib/query-parser"

/**
 * API Route to generate GitHub stats SVG
 * GET /api?username=<github-username>&theme=<theme>&locale=<locale>...
 *
 * Supports github-readme-stats compatible parameters:
 * - username: GitHub username (required)
 * - theme: Theme name (default, dark, radical, etc.)
 * - locale: Language code (en, cn, ja, ko, etc.)
 * - hide_border: Hide border (true/false)
 * - hide_rank: Hide rank badge (true/false)
 * - show_icons: Show stat icons (true/false, default: true)
 * - bg_color: Custom background color (hex)
 * - title_color: Custom title color (hex)
 * - text_color: Custom text color (hex)
 * - icon_color: Custom icon color (hex)
 * - border_color: Custom border color (hex)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const params = parseQueryParams(searchParams)

  if (!params.username) {
    return NextResponse.json({ error: "Username parameter is required" }, { status: 400 })
  }



  try {
    // Fetch GitHub stats
    const stats = await fetchGitHubStats(params.username)


    console.log("[v0] Rendering stats card for:", params.username)
    const svg = await renderStatsCard(stats, params.username, {
      theme: params.theme,
      locale: params.locale,
      hideBorder: params.hideBorder,
      hideRank: params.hideRank,
      showIcons: params.showIcons,
      customColors: Object.keys(params.customColors).length > 0 ? params.customColors : undefined,
    })

    // Debug: log a snippet of SVG to check rect elements
    const rectMatches = svg.match(/<rect[^>]*>/g) || []
    console.log("[v0] Total rect elements:", rectMatches.length)
    rectMatches.forEach((r, i) => console.log(`[v0] rect[${i}]:`, r))
    console.log("[v0] Has progress-fill-bar class:", svg.includes("progress-fill-bar"))
    console.log("[v0] Has animation style:", svg.includes("progress-grow"))

    // Return SVG with appropriate headers and caching
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=14400", // Cache for 4 hours
      },
    })
  } catch (error) {
    console.error("Error in API route:", error)

    try {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      const errorSvg = await renderErrorCard(errorMessage, params.username, {
        theme: params.theme,
        customColors: params.customColors,
      })

      return new NextResponse(errorSvg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "no-cache",
        },
      })
    } catch {
      // Fallback to JSON error if error card fails
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "An unexpected error occurred" },
        { status: 500 },
      )
    }
  }
}
