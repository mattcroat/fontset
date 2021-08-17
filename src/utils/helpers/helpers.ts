import { downloadZip } from 'client-zip'

import type { WeightType } from '@root/src/types'

export const weightLabel = {
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

function styles(weights: WeightType[]) {
  return hasItalics(weights) ? ':ital,wght@' : ':wght@'
}

export function formatWeights(weights: string[]) {
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

async function fetched(url: string, options = {}) {
  const response = await fetch(url, options)
  const result = await response.text()

  if (!response.ok) {
    throw new Error(`💩 Something went wrong fetching ${url}`)
  }

  return result
}

export async function parseURL(url: string) {
  const charSets = await fetched(url)

  return charSets.match(/(\/\* )(.|\n\r|\r|\n)*?}/g)?.map((charSet) => ({
    characterSet: charSet.match(/\/\* (.*) \*\//)![1],
    fontFamily: charSet.match(/font-family: '(\w+)'/)![1],
    fontStyle: charSet.match(/font-style: (\w+)/)![1],
    fontWeight: charSet.match(/font-weight: (\w+)/)![1],
    src: charSet.match(/src: url\((.*?)\)/)![1],
    unicodeRange: charSet.match(/unicode-range: (.*);/)![1],
  }))
}

export function fontRequest(selectedFont: string, weights: WeightType[]) {
  const baseUrl = 'https://fonts.googleapis.com/css2?family='
  const style = styles(weights)
  const weight = formatWeights(weights)
  const display = '&display=swap'

  return `${baseUrl}${selectedFont}${style}${weight}${display}`
}

export function createLink(url: string) {
  const linkEl = document.createElement('link')
  linkEl.rel = 'stylesheet'
  linkEl.href = url

  document.head.append(linkEl)

  return linkEl
}

export async function zip(data: any[]) {
  const blob = await downloadZip(data).blob()
  const url = URL.createObjectURL(blob)
  return url
}

export async function createDownload(selectedFont: string, url: string) {
  const data = await parseURL(url)
  const fonts = await Promise.all(
    data.map(async ({ style, url, weight }) => ({
      name: `${selectedFont}-${weight}-${style}.woff2`,
      input: await fetch(url).then((url) => url.blob()),
    }))
  )
  const download = zip(fonts)
  return download
}
