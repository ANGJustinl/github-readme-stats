import satori from "satori"
import type { GitHubStats } from "./github-service"
import { loadFonts } from "./fonts"
import { StarIcon, CommitIcon, PullRequestIcon, IssueIcon, RepoIcon, TrophyIcon } from "./icons"
import { getTheme, type Theme } from "./themes"
import { getRankInfo, formatScore } from "./rank"
import { getTranslations, formatNumber, type Locale } from "./i18n"

export interface RenderOptions {
  theme?: string
  locale?: string
  customColors?: Partial<Theme>
  hideRank?: boolean
  hideBorder?: boolean
  showIcons?: boolean
}

export async function renderStatsCard(
  stats: GitHubStats,
  username: string,
  options: RenderOptions = {},
): Promise<string> {
  const {
    theme: themeName = 'default',
    locale = 'en',
    customColors,
    hideRank = false,
    hideBorder = false,
    showIcons = true,
  } = options

  // Load fonts and theme
  const fonts = await loadFonts()
  const theme = getTheme(themeName, customColors)
  const t = getTranslations(locale)
  const rankInfo = getRankInfo(stats)

  // Convert hex colors to # format
  const bgColor = `#${theme.bg_color}`
  const titleColor = `#${theme.title_color}`
  const textColor = `#${theme.text_color}`
  const iconColor = `#${theme.icon_color}`
  const borderColor = `#${theme.border_color}`
  const accentColor = `#${theme.accent_color || theme.icon_color}`

  const svg = await satori(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: bgColor,
        border: hideBorder ? 'none' : `6px solid ${borderColor}`,
        padding: 20,
        fontFamily: 'Inter',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Pixel Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${borderColor}22 1px, transparent 1px),
            linear-gradient(90deg, ${borderColor}22 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px',
          opacity: 0.3,
          display: 'flex',
        }}
      />

      {/* Header with Rank Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              background: iconColor,
              border: `4px solid ${borderColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 900,
              color: bgColor,
              textTransform: 'uppercase',
              boxShadow: `3px 3px 0px ${borderColor}`,
            }}
          >
            {username.charAt(0).toUpperCase()}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: titleColor,
                display: 'flex',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
              }}
            >
              {username}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: textColor,
                display: 'flex',
                opacity: 0.7,
                textTransform: 'uppercase',
              }}
            >
              {t.stats}
            </div>
          </div>
        </div>

        {/* Rank Badge */}
        {!hideRank && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <div
              style={{
                background: rankInfo.color,
                border: `4px solid ${borderColor}`,
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `3px 3px 0px ${borderColor}`,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: bgColor,
                  display: 'flex',
                  letterSpacing: '-0.02em',
                }}
              >
                {rankInfo.rank}
              </div>
            </div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 900,
                color: textColor,
                display: 'flex',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              {rankInfo.level}
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid - 2 rows */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          position: 'relative',
          zIndex: 1,
          flex: 1,
        }}
      >
        {/* First Row */}
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <StatItem
            icon={showIcons ? <StarIcon color={borderColor} size={14} /> : null}
            label={t.totalStars}
            value={formatNumber(stats.totalStars, locale)}
            color="#FFEB3B"
            borderColor={borderColor}
            bgColor={bgColor}
            textColor={textColor}
          />
          <StatItem
            icon={showIcons ? <CommitIcon color={borderColor} size={14} /> : null}
            label={t.totalCommits}
            value={formatNumber(stats.totalCommits, locale)}
            color="#0066FF"
            borderColor={borderColor}
            bgColor={bgColor}
            textColor={textColor}
          />
          <StatItem
            icon={showIcons ? <PullRequestIcon color={borderColor} size={14} /> : null}
            label={t.totalPRs}
            value={formatNumber(stats.totalPRs, locale)}
            color="#9D4EDD"
            borderColor={borderColor}
            bgColor={bgColor}
            textColor={textColor}
          />
        </div>
        
        {/* Second Row */}
        <div
          style={{
            display: 'flex',
            gap: 10,
          }}
        >
          <StatItem
            icon={showIcons ? <IssueIcon color={borderColor} size={14} /> : null}
            label={t.totalIssues}
            value={formatNumber(stats.totalIssues, locale)}
            color="#FF3366"
            borderColor={borderColor}
            bgColor={bgColor}
            textColor={textColor}
          />
          <StatItem
            icon={showIcons ? <RepoIcon color={borderColor} size={14} /> : null}
            label={t.contributedTo}
            value={formatNumber(stats.contributedTo, locale)}
            color="#00FF88"
            borderColor={borderColor}
            bgColor={bgColor}
            textColor={textColor}
          />
          {/* Score Badge in grid */}
          {!hideRank && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: borderColor,
                color: bgColor,
                padding: '8px 12px',
                border: `3px solid ${borderColor}`,
                fontSize: 9,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                flex: 1,
                boxShadow: `3px 3px 0px ${borderColor}`,
              }}
            >
              <TrophyIcon color={bgColor} size={12} />
              <span>{t.score}: {formatScore(rankInfo.score)}</span>
              <span style={{ opacity: 0.6 }}>|</span>
              <span>{t.percentile} {rankInfo.percentile.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>,
    {
      width: 600,
      height: 260,
      fonts: [
        {
          name: 'Inter',
          data: fonts.regular!,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fonts.bold!,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fonts.black!,
          weight: 900,
          style: 'normal',
        },
      ],
    },
  )

  return svg
}

function StatItem({
  icon,
  label,
  value,
  color,
  borderColor,
  bgColor,
  textColor,
}: {
  icon: React.ReactNode | null
  label: string
  value: string | number
  color: string
  borderColor: string
  bgColor: string
  textColor: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: bgColor,
        border: `3px solid ${borderColor}`,
        padding: '8px 12px',
        boxShadow: `3px 3px 0px ${borderColor}`,
        flex: 1,
      }}
    >
      {icon && (
        <div
          style={{
            width: 28,
            height: 28,
            background: color,
            border: `2px solid ${borderColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: textColor,
            display: 'flex',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 900,
            opacity: 0.6,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: textColor,
            display: 'flex',
          }}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

/**
 * Render error card when something goes wrong
 * Returns SVG instead of throwing to maintain README integrity
 */
export async function renderErrorCard(
  error: string,
  username?: string,
  options: RenderOptions = {},
): Promise<string> {
  const { theme: themeName = 'default', customColors } = options
  const theme = getTheme(themeName, customColors)
  const fonts = await loadFonts()

  const bgColor = `#${theme.bg_color}`
  const borderColor = `#${theme.border_color}`
  const textColor = `#${theme.text_color}`
  const errorColor = '#FF3366'

  const svg = await satori(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: bgColor,
        border: `6px solid ${borderColor}`,
        padding: 32,
        fontFamily: 'Inter',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          background: errorColor,
          border: `4px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          fontWeight: 900,
          color: bgColor,
          boxShadow: `4px 4px 0px ${borderColor}`,
        }}
      >
        !
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 900,
          color: textColor,
          display: 'flex',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {username ? `Error loading stats for ${username}` : 'Something went wrong'}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: textColor,
          display: 'flex',
          opacity: 0.7,
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        {error}
      </div>
    </div>,
    {
      width: 600,
      height: 260,
      fonts: [
        {
          name: 'Inter',
          data: fonts.bold!,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fonts.black!,
          weight: 900,
          style: 'normal',
        },
      ],
    },
  )

  return svg
}
