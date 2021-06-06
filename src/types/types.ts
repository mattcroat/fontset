import type characterTable from '@root/data/characterTable.json'
import { weightNames } from '@root/src/utils/helpers'

export interface State {
  characterSet: keyof typeof characterTable
  font: {
    baseUrl: string
    queryParams: {
      display: string
      text: string
      weight: string
    }
  }
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
