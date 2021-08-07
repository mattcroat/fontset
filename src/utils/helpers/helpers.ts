import characters from '@root/src/data/character-table.json'

export const weightNames = {
  '100': 'Thin',
  '200': 'Extra Light',
  '300': 'Light',
  '400': 'Normal',
  '500': 'Medium',
  '600': 'Semi Bold',
  '700': 'Bold',
  '800': 'Extra Bold',
  '900': 'Black',
  '950': 'Extra Black',
  '100i': 'Italic Thin',
  '200i': 'Italic Extra Light',
  '300i': 'Italic Light',
  '400i': 'Italic Normal',
  '500i': 'Italic Medium',
  '600i': 'Italic Semi Bold',
  '700i': 'Italic Bold',
  '800i': 'Italic Extra Bold',
  '900i': 'Italic Black',
  '950i': 'Italic Extra Black',
}

export function hasItalics(weights: string[]) {
  return weights.filter((weight) => weight.match('i')).length > 0
}

export function formatWeights(weights: string[]) {
  if (!hasItalics(weights)) return weights.sort().join(';')

  const formatWeights = weights
    .map((weight) => {
      return weight.includes('i')
        ? `1,${weight}`.replace('i', '')
        : `0,${weight}`
    })
    .sort()
    .join(';')

  return formatWeights
}

export async function parseURL(url: string) {
  try {
    const response = await fetch(url)
    const data = await response.text()

    if (!response.ok) {
      throw new Error('💩 Could not get resource')
    }

    const fonts = data
      .split('@font-face')
      .filter((font) => font.includes('font-family'))
      .map((font) => {
        const style = font
          .split(';')
          .filter((font) => font.includes('style'))
          .map((font) => font.split(':')[1].trim())
          .join('')

        const url = font
          .split(';')
          .filter((font) => font.includes('src'))
          .map((font) => font.slice(font.indexOf('(') + 1, font.indexOf(')')))
          .join('')

        const weight = font
          .split(';')
          .filter((font) => font.includes('weight'))
          .map((font) => font.split(':')[1].trim())
          .join('')

        return { style, url, weight }
      })

    return fonts
  } catch (error) {
    throw new Error(`💩 Something went wrong: ${error}`)
  }
}

export function createLink(selectedFont, weights, language, specialCharacters) {
  const baseUrl = 'https://fonts.googleapis.com/css2?family='
  const style = hasItalics(weights) ? ':ital,wght@' : ':wght@'
  const wght = formatWeights(weights)
  const text = specialCharacters
    ? `&text=${characters[language].join('') + specialCharacters}`
    : `&text=${characters[language].join('')}`
  const display = '&display=swap'
  const url = `${baseUrl}${selectedFont}${style}${wght}${text}${display}`

  const linkEl = document.createElement('link')
  linkEl.rel = 'stylesheet'
  linkEl.href = url
  document.head.append(linkEl)

  return { url, linkEl }
}
