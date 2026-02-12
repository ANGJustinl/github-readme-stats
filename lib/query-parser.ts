/**
 * Query Parameter Parser
 * Converts URL query strings to typed configuration
 * Compatible with github-readme-stats parameters
 */

import type { Theme } from "./themes"

/**
 * Parse boolean from URL parameter
 * GRS uses "true" as truthy, everything else is falsy
 */
export function parseBoolean(value: string | null): boolean {
  return value === "true"
}

/**
 * Parse string with fallback
 */
export function parseString(value: string | null, fallback = ""): string {
  return value || fallback
}

/**
 * Parse hex color from URL parameter
 * Validates format and adds # prefix
 */
export function parseColor(value: string | null): string | undefined {
  if (!value) return undefined

  // Remove # if present
  const color = value.replace(/^#/, "")

  // Validate hex format (3, 4, 6, or 8 digits)
  const hexRegex = /^[0-9a-fA-F]{3,8}$/
  if (!hexRegex.test(color)) return undefined

  return color.toUpperCase()
}

/**
 * Parse gradient color (e.g., "FF0000,00FF00" -> "linear-gradient(...)")
 * This is a GRS-compatible feature
 */
export function parseGradientColor(value: string | null): string | undefined {
  if (!value) return undefined

  // Check if it's a gradient (contains comma)
  if (value.includes(",")) {
    const colors = value.split(",").map((c) => `#${c.replace(/^#/, "")}`)
    // Return gradient format for CSS
    return `linear-gradient(135deg, ${colors.join(", ")})`
  }

  return parseColor(value)
}

export interface ParsedQueryParams {
  username: string
  theme: string
  locale: string
  hideBorder: boolean
  hideRank: boolean
  hideTitle: boolean
  showIcons: boolean
  customColors: Partial<Theme>
  includeAllCommits: boolean
  countPrivate: boolean
  customTitle: string | undefined
}

/**
 * Parse all query parameters from URLSearchParams
 * Compatible with github-readme-stats URL format
 */
export function parseQueryParams(searchParams: URLSearchParams): ParsedQueryParams {
  const username = searchParams.get("username") || ""

  // Theme & Locale
  const theme = parseString(searchParams.get("theme"), "default")
  const locale = parseString(searchParams.get("locale"), "en")

  // Layout options
  const hideBorder = parseBoolean(searchParams.get("hide_border"))
  const hideRank = parseBoolean(searchParams.get("hide_rank"))
  const hideTitle = parseBoolean(searchParams.get("hide_title"))
  const showIcons = searchParams.get("show_icons") !== "false" // Default to true

  // Custom colors (override theme)
  const customColors: Partial<Theme> = {}

  const bgColor = parseColor(searchParams.get("bg_color"))
  if (bgColor) customColors.bg_color = bgColor

  const titleColor = parseColor(searchParams.get("title_color"))
  if (titleColor) customColors.title_color = titleColor

  const textColor = parseColor(searchParams.get("text_color"))
  if (textColor) customColors.text_color = textColor

  const iconColor = parseColor(searchParams.get("icon_color"))
  if (iconColor) customColors.icon_color = iconColor

  const borderColor = parseColor(searchParams.get("border_color"))
  if (borderColor) customColors.border_color = borderColor

  // Content options
  const includeAllCommits = parseBoolean(searchParams.get("include_all_commits"))
  const countPrivate = parseBoolean(searchParams.get("count_private"))

  // Custom title
  const customTitle = searchParams.get("custom_title") || undefined

  return {
    username,
    theme,
    locale,
    hideBorder,
    hideRank,
    hideTitle,
    showIcons,
    customColors,
    includeAllCommits,
    countPrivate,
    customTitle,
  }
}
