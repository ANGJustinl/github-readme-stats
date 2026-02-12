/**
 * Internationalization (i18n) Support
 * Supports multiple languages for better global reach
 */

export type Locale = 'en' | 'cn' | 'zh-CN' | 'zh-TW' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'ru' | 'pt' | 'ar'

export interface Translations {
  stats: string
  totalStars: string
  totalCommits: string
  totalPRs: string
  totalIssues: string
  contributedTo: string
  rank: string
  level: string
  score: string
  percentile: string
}

const translations: Record<Locale, Translations> = {
  en: {
    stats: 'GitHub Stats',
    totalStars: 'Total Stars',
    totalCommits: 'Total Commits',
    totalPRs: 'Total PRs',
    totalIssues: 'Total Issues',
    contributedTo: 'Contributed to',
    rank: 'Rank',
    level: 'Level',
    score: 'Score',
    percentile: 'Top',
  },
  cn: {
    stats: 'GitHub 统计',
    totalStars: '获得星标',
    totalCommits: '总提交数',
    totalPRs: '总 PR 数',
    totalIssues: '总议题数',
    contributedTo: '贡献项目',
    rank: '等级',
    level: '级别',
    score: '得分',
    percentile: '前',
  },
  'zh-CN': {
    stats: 'GitHub 统计',
    totalStars: '获得星标',
    totalCommits: '总提交数',
    totalPRs: '总 PR 数',
    totalIssues: '总议题数',
    contributedTo: '贡献项目',
    rank: '等级',
    level: '级别',
    score: '得分',
    percentile: '前',
  },
  'zh-TW': {
    stats: 'GitHub 統計',
    totalStars: '獲得星標',
    totalCommits: '總提交數',
    totalPRs: '總 PR 數',
    totalIssues: '總議題數',
    contributedTo: '貢獻專案',
    rank: '等級',
    level: '級別',
    score: '得分',
    percentile: '前',
  },
  ja: {
    stats: 'GitHub 統計',
    totalStars: '合計スター',
    totalCommits: '合計コミット',
    totalPRs: '合計 PR',
    totalIssues: '合計イシュー',
    contributedTo: '貢献したリポジトリ',
    rank: 'ランク',
    level: 'レベル',
    score: 'スコア',
    percentile: 'トップ',
  },
  ko: {
    stats: 'GitHub 통계',
    totalStars: '총 스타',
    totalCommits: '총 커밋',
    totalPRs: '총 PR',
    totalIssues: '총 이슈',
    contributedTo: '기여한 저장소',
    rank: '랭크',
    level: '레벨',
    score: '점수',
    percentile: '상위',
  },
  es: {
    stats: 'Estadísticas de GitHub',
    totalStars: 'Estrellas Totales',
    totalCommits: 'Commits Totales',
    totalPRs: 'PRs Totales',
    totalIssues: 'Issues Totales',
    contributedTo: 'Contribuido a',
    rank: 'Rango',
    level: 'Nivel',
    score: 'Puntuación',
    percentile: 'Top',
  },
  fr: {
    stats: 'Statistiques GitHub',
    totalStars: 'Étoiles Totales',
    totalCommits: 'Commits Totaux',
    totalPRs: 'PRs Totales',
    totalIssues: 'Issues Totales',
    contributedTo: 'Contribué à',
    rank: 'Rang',
    level: 'Niveau',
    score: 'Score',
    percentile: 'Top',
  },
  de: {
    stats: 'GitHub-Statistiken',
    totalStars: 'Gesamte Sterne',
    totalCommits: 'Gesamte Commits',
    totalPRs: 'Gesamte PRs',
    totalIssues: 'Gesamte Issues',
    contributedTo: 'Beigetragen zu',
    rank: 'Rang',
    level: 'Stufe',
    score: 'Punktzahl',
    percentile: 'Top',
  },
  ru: {
    stats: 'Статистика GitHub',
    totalStars: 'Всего звёзд',
    totalCommits: 'Всего коммитов',
    totalPRs: 'Всего PR',
    totalIssues: 'Всего задач',
    contributedTo: 'Внёс вклад в',
    rank: 'Ранг',
    level: 'Уровень',
    score: 'Счёт',
    percentile: 'Топ',
  },
  pt: {
    stats: 'Estatísticas do GitHub',
    totalStars: 'Total de Estrelas',
    totalCommits: 'Total de Commits',
    totalPRs: 'Total de PRs',
    totalIssues: 'Total de Issues',
    contributedTo: 'Contribuiu para',
    rank: 'Classificação',
    level: 'Nível',
    score: 'Pontuação',
    percentile: 'Top',
  },
  ar: {
    stats: 'إحصائيات GitHub',
    totalStars: 'إجمالي النجوم',
    totalCommits: 'إجمالي الالتزامات',
    totalPRs: 'إجمالي طلبات السحب',
    totalIssues: 'إجمالي المشكلات',
    contributedTo: 'ساهم في',
    rank: 'الرتبة',
    level: 'المستوى',
    score: 'النقاط',
    percentile: 'أعلى',
  },
}

/**
 * Get translations for a specific locale
 */
export function getTranslations(locale: string = 'en'): Translations {
  const normalizedLocale = locale.toLowerCase() as Locale
  return translations[normalizedLocale] || translations.en
}

/**
 * Format number with locale-specific formatting
 */
export function formatNumber(num: number, locale: string = 'en'): string {
  try {
    return new Intl.NumberFormat(locale).format(num)
  } catch {
    return num.toLocaleString()
  }
}
