export interface GitHubStats {
  totalStars: number
  totalCommits: number
  totalPRs: number
  totalIssues: number
  contributedTo: number
}

const GITHUB_API_URL = "https://api.github.com/graphql"

/**
 * Fetch user statistics from GitHub GraphQL API
 * Aggregates stars, commits, PRs, and issues
 * Supports both users and organizations
 */
export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set")
  }

  const userQuery = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalRepositoryContributions
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            stargazers {
              totalCount
            }
          }
        }
        pullRequests(first: 1) {
          totalCount
        }
        issues(first: 1) {
          totalCount
        }
      }
    }
  `

  const orgQuery = `
    query($login: String!) {
      organization(login: $login) {
        repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  `

  try {
    // Try user query first
    let response = await fetch(GITHUB_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: userQuery,
        variables: { login: username },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    let data = await response.json()

    // If user query fails, try organization query
    if (data.errors || !data.data?.user) {
      response = await fetch(GITHUB_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: orgQuery,
          variables: { login: username },
        }),
      })

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
      }

      data = await response.json()

      if (data.errors) {
        throw new Error(`GraphQL error: ${data.errors[0].message}`)
      }

      if (!data.data?.organization) {
        throw new Error(`User or organization "${username}" not found`)
      }

      // Return organization stats
      const org = data.data.organization
      const totalStars = org.repositories.nodes.reduce((sum: number, repo: any) => sum + repo.stargazers.totalCount, 0)

      return {
        totalStars,
        totalCommits: 0, // Organizations don't have personal contributions
        totalPRs: 0,
        totalIssues: 0,
        contributedTo: org.repositories.totalCount,
      }
    }

    // Return user stats
    const user = data.data.user
    const contributions = user.contributionsCollection
    const totalStars = user.repositories.nodes.reduce((sum: number, repo: any) => sum + repo.stargazers.totalCount, 0)

    return {
      totalStars,
      totalCommits: contributions.totalCommitContributions,
      totalPRs: user.pullRequests.totalCount,
      totalIssues: user.issues.totalCount,
      contributedTo: contributions.totalRepositoryContributions,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to fetch GitHub stats")
  }
}
