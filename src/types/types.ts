import type characterTable from '@root/data/characterTable.json'

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
  lastSelectedFontEl: HTMLElement | null
  queryString: string
  selectedCharacterSet: string
  selectedFont: string
  showVariableFontsOnly: boolean
  specialCharacters: string
}
