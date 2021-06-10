import type characterTable from '@root/data/characterTable.json'
import { weightNames } from '@root/src/utils/helpers'

export interface Font {
  family: string
  category: string
  weights: string[]
  axes: []
}

export interface State {
  characterSet: keyof typeof characterTable
  fontURL: string
  fontWeights: Set<WeightSizes>
  lastSelectedFontEl: HTMLElement | null
  queryString: string
  selectedCharacterSet: string
  selectedFont: string
  selectedWeights: string
  showVariableFontsOnly: boolean
  specialCharacters: string
}

export interface WeightNames {
  [key: string]: string
}

export type WeightSizes = keyof typeof weightNames
