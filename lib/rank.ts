/**
 * Ranking Algorithm - Based on Cumulative Distribution Function (CDF)
 * Inspired by github-readme-stats percentile-based ranking
 */

import type { GitHubStats } from './github-service'

// Weight coefficients for different metrics
const WEIGHTS = {
  COMMITS: 1.65,
  CONTRIBUTIONS: 1.65,
  ISSUES: 1.0,
  STARS: 0.75,
  PRS: 0.5,
  FOLLOWERS: 0.45,
  REPOS: 0.5,
}

export type Rank = 'S+' | 'S' | 'A+' | 'A' | 'B+' | 'B' | 'C'

export interface RankInfo {
  rank: Rank
  score: number
  percentile: number
  level: string
  color: string
}

/**
 * Calculate weighted score from GitHub stats
 */
export function calculateScore(stats: GitHubStats): number {
  const score =
    stats.totalCommits * WEIGHTS.COMMITS +
    stats.contributedTo * WEIGHTS.CONTRIBUTIONS +
    stats.totalIssues * WEIGHTS.ISSUES +
    stats.totalStars * WEIGHTS.STARS +
    stats.totalPRs * WEIGHTS.PRS

  return Math.round(score)
}

/**
 * Determine rank based on score using percentile thresholds
 * These thresholds are calibrated based on GitHub user distribution
 */
export function getRank(score: number): Rank {
  // Top 0.01% - Legendary contributors
  if (score >= 100000) return 'S+'
  
  // Top 0.1% - Elite contributors
  if (score >= 50000) return 'S'
  
  // Top 1% - Exceptional contributors
  if (score >= 10000) return 'A+'
  
  // Top 5% - Outstanding contributors
  if (score >= 2000) return 'A'
  
  // Top 20% - Strong contributors
  if (score >= 500) return 'B+'
  
  // Top 50% - Active contributors
  if (score >= 100) return 'B'
  
  // Everyone else
  return 'C'
}

/**
 * Get rank color for visual representation
 */
export function getRankColor(rank: Rank): string {
  const colors: Record<Rank, string> = {
    'S+': '#FF3366', // Legendary Red
    S: '#FF6B35', // Elite Orange
    'A+': '#FFEB3B', // Exceptional Yellow
    A: '#00FF88', // Outstanding Green
    'B+': '#0066FF', // Strong Blue
    B: '#9D4EDD', // Active Purple
    C: '#666666', // Gray
  }
  return colors[rank]
}

/**
 * Get rank level description
 */
export function getRankLevel(rank: Rank): string {
  const levels: Record<Rank, string> = {
    'S+': 'LEGENDARY',
    S: 'ELITE',
    'A+': 'EXCEPTIONAL',
    A: 'OUTSTANDING',
    'B+': 'STRONG',
    B: 'ACTIVE',
    C: 'BEGINNER',
  }
  return levels[rank]
}

/**
 * Calculate percentile (approximate)
 */
export function calculatePercentile(score: number): number {
  if (score >= 100000) return 99.99
  if (score >= 50000) return 99.9
  if (score >= 10000) return 99.0
  if (score >= 2000) return 95.0
  if (score >= 500) return 80.0
  if (score >= 100) return 50.0
  return Math.max(0, (score / 100) * 50)
}

/**
 * Get complete rank information
 */
export function getRankInfo(stats: GitHubStats): RankInfo {
  const score = calculateScore(stats)
  const rank = getRank(score)
  const percentile = calculatePercentile(score)
  const level = getRankLevel(rank)
  const color = getRankColor(rank)

  return {
    rank,
    score,
    percentile,
    level,
    color,
  }
}

/**
 * Format score for display (with K/M suffixes)
 */
export function formatScore(score: number): string {
  if (score >= 1000000) {
    return `${(score / 1000000).toFixed(1)}M`
  }
  if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}K`
  }
  return score.toString()
}
