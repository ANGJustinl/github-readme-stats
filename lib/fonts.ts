/**
 * Font Loading Utilities for Satori
 * Optimized for serverless cold start performance
 */

let fontCache: { regular?: ArrayBuffer; bold?: ArrayBuffer; black?: ArrayBuffer } = {}

export async function loadFonts() {
  if (Object.keys(fontCache).length > 0) {
    return fontCache
  }

  try {
    const [regular, bold, black] = await Promise.all([
      fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-400-normal.woff').then(
        (res) => res.arrayBuffer(),
      ),
      fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-700-normal.woff').then(
        (res) => res.arrayBuffer(),
      ),
      fetch('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-900-normal.woff').then(
        (res) => res.arrayBuffer(),
      ),
    ])

    fontCache = { regular, bold, black }
    return fontCache
  } catch (error) {
    console.error('[Fonts] Failed to load fonts:', error)
    throw new Error('Font loading failed')
  }
}

export function clearFontCache() {
  fontCache = {}
}
