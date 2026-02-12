/**
 * SVG Icon Components for Satori
 * Using Octicons-style paths for GitHub aesthetic
 */

interface IconProps {
  color: string
  size?: number
}

export const StarIcon = ({ color, size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      fill={color}
      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"
    />
  </svg>
)

export const CommitIcon = ({ color, size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      fill={color}
      d="M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32zM8 5a3 3 0 100 6 3 3 0 000-6z"
    />
  </svg>
)

export const PullRequestIcon = ({ color, size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      fill={color}
      d="M1.5 3.25a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zm5.677-.177L9.573.677A.25.25 0 0110 .854v2.396A4.25 4.25 0 0114.25 7.5v1.128a2.251 2.251 0 11-1.5 0V7.5a2.75 2.75 0 00-2.75-2.75h-.5v2.396a.25.25 0 01-.427.177L7.177 5.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm0 9.5a.75.75 0 100 1.5.75.75 0 000-1.5zm10-3.75a.75.75 0 100 1.5.75.75 0 000-1.5z"
    />
  </svg>
)

export const IssueIcon = ({ color, size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      fill={color}
      d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
    />
    <path
      fill={color}
      fillRule="evenodd"
      d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
      clipRule="evenodd"
    />
  </svg>
)

export const RepoIcon = ({ color, size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      fill={color}
      fillRule="evenodd"
      d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
      clipRule="evenodd"
    />
  </svg>
)

export const TrophyIcon = ({ color, size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path
      fill={color}
      d="M3.217 6.962A3.75 3.75 0 010 3.25v-.5C0 2.336.336 2 .75 2h1.5a.75.75 0 010 1.5H1.5v.25a2.25 2.25 0 002.217 2.212.75.75 0 010 1.5zm9.566 0a.75.75 0 010-1.5A2.25 2.25 0 0015 3.25V3h-.75a.75.75 0 010-1.5h1.5c.414 0 .75.336.75.75v.5a3.75 3.75 0 01-3.217 3.712zM5.25 8a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 015.25 8zm5.5 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM8 1a3 3 0 00-3 3v4a3 3 0 106 0V4a3 3 0 00-3-3zm1.5 7a1.5 1.5 0 11-3 0V4a1.5 1.5 0 013 0v4zM8 12a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 018 12zm-2.5 1.25a.75.75 0 000 1.5h5a.75.75 0 000-1.5h-5z"
    />
  </svg>
)
