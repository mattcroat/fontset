import { downloadZip } from 'client-zip'

import type {
  CharacterSetType,
  FontType,
  StyleType,
  WeightType,
} from '@root/src/types'

export function hasItalics(weights: string[]): boolean {
  return weights.filter((weight) => weight.match('i')).length > 0
}

function styles(weights: WeightType[]): StyleType {
  return hasItalics(weights) ? ':ital,wght@' : ':wght@'
}

export function weightFormat(weights: string[]): string {
  if (!hasItalics(weights)) return weights.sort().join(';')

  return weights
    .map((weight) => {
      return weight.includes('i')
        ? `1,${weight}`.replace('i', '')
        : `0,${weight}`
    })
    .sort()
    .join(';')
}

async function fetched(url: string, options = {}): Promise<string> {
  const response = await fetch(url, options)
  const result = await response.text()

  if (!response.ok) {
    throw new Error(`💩 Something went wrong fetching ${url}`)
  }

  return result
}

export async function fontParse(url: string): Promise<FontType[]> {
  const charSets = await fetched(url)

  return charSets.match(/(\/\* )(.|\n\r|\r|\n)*?}/g)!.map((charSet) => ({
    characterSet: charSet.match(/\/\* (.*) \*\//)![1],
    fontFamily: charSet.match(/font-family: '([\w ]+)'/)![1],
    fontStyle: charSet.match(/font-style: (\w+)/)![1],
    fontWeight: charSet.match(/font-weight: (\w+)/)![1],
    src: charSet.match(/src: url\((.*?)\)/)![1],
    unicodeRange: charSet.match(/unicode-range: (.*);/)![1],
  }))
}

export async function characterSet(url: string): Promise<CharacterSetType[]> {
  const charSets = await fontParse(url)

  // character sets repeat for each weight, so return only unique values
  return [
    ...new Set(
      charSets.map(({ characterSet }) => characterSet as CharacterSetType)
    ),
  ]
}

export function fontRequest(
  selectedFont: string,
  weights: WeightType[]
): string {
  const baseUrl = 'https://fonts.googleapis.com/css2?family='
  const style = styles(weights)
  const weight = weightFormat(weights)
  const display = '&display=swap'
  const url = `${baseUrl}${selectedFont}${style}${weight}${display}`
  return url
}

export function createLink(url: string): HTMLLinkElement {
  const linkEl = document.createElement('link')
  linkEl.rel = 'stylesheet'
  linkEl.href = url
  document.head.append(linkEl)
  return linkEl
}

export async function zip(data: any): Promise<string> {
  const blob = await downloadZip(data).blob()
  const url = URL.createObjectURL(blob)
  return url
}

export async function createDownload(url: string): Promise<string> {
  const charSets = await fontParse(url)
  const data = await Promise.all(
    charSets?.map(async ({ fontFamily, fontStyle, fontWeight, src }) => ({
      name: `${fontFamily}-${fontWeight}-${fontStyle}.woff2`,
      input: await fetch(src),
    }))
  )
  const download = await zip(data)
  return download
}

function fontStyles(selectedCharSets: FontType[]) {
  return selectedCharSets
    .map((charSet) => {
      return `
/* ${charSet.characterSet} */
@font-face {
  font-family: '${charSet.fontFamily}';
  font-style: ${charSet.fontStyle};
  font-weight: ${charSet.fontWeight};
  font-display: swap;
  src: url(${charSet.fontFamily}-${charSet.fontWeight}-${charSet.fontStyle}-${charSet.characterSet}.woff2) format('woff2');
  unicode-range: ${charSet.unicodeRange};
}
`
    })
    .join('')
    .trim()
}

export async function createStyles(
  selectedCharSet: CharacterSetType[],
  url: string
): Promise<string> {
  const charSets = await fontParse(url)
  const selectedCharSets = charSets.filter(({ characterSet }) =>
    selectedCharSet.includes(characterSet as CharacterSetType)
  )
  return fontStyles(selectedCharSets)
}
