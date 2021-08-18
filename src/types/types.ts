import { weightLabel } from '@root/src/utils/helpers'

export type WeightType = keyof typeof weightLabel

export type FontType = {
  characterSet: string
  fontFamily: string
  fontStyle: string
  fontWeight: string
  src: string
  unicodeRange: string
}

export type DownloadType = {
  name: string
  input: string
}
