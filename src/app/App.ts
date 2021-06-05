import type { State } from '@root/src/types'

import characterTable from '@root/data/characterTable.json'
import parsedFonts from '@root/data/parsedFonts.json'

export class App {
  private state: State = {
    characterSet: 'English',
    font: {
      baseUrl: 'https://fonts.googleapis.com/css2?family=',
      queryParams: {
        display: '&display=swap',
        text: '&text=',
        weight: ':wght@',
      },
    },
    fontURL: '',
    lastSelectedFontEl: null,
    queryString: '',
    selectedCharacterSet: '',
    selectedFont: 'Quicksand',
    selectedWeights: '400',
    showVariableFontsOnly: false,
    specialCharacters: '',
  }

  private headEl = document.head

  private fontsListEl = document.querySelector('[data-fonts-list]') as HTMLSelectElement
  private fontWeightsEl = document.querySelector('[data-font-weights]') as HTMLDivElement
  private fontWeightsTitleEl = document.querySelector('[data-font-weights-title]') as HTMLDivElement
  private variableFontsCheckboxEl = document.querySelector('[data-variable-fonts]') as HTMLInputElement

  private characterTableEl = document.querySelector('[data-character-table]') as HTMLDivElement

  private previewTextEl = document.querySelector('[data-preview-text]') as HTMLParagraphElement
  private downloadLinkEl = document.querySelector('[data-download-link]') as HTMLLinkElement

  public init() {
    this.updateFontOptions()
    this.updateCharacterTable()
    this.setDefaultFont()

    this.fontsListEl.onchange = (event) => this.setFont(event)
    this.variableFontsCheckboxEl.onchange = (event) => this.showVariableFontsOnly(event)
  }

  private updateFontOptions() {
    this.fontsListEl.innerHTML = ''

    for (const { axes, category, family } of parsedFonts) {
      if (this.state.showVariableFontsOnly && axes.length > 0) {
        const fontOptionEl = document.createElement('option')
        fontOptionEl.text = `${family} (${category})`
        fontOptionEl.value = family
        this.fontsListEl.append(fontOptionEl)
      }

      if (!this.state.showVariableFontsOnly) {
        const fontOptionEl = document.createElement('option')
        fontOptionEl.text = `${family} (${category})`
        fontOptionEl.value = family

        if (fontOptionEl?.value === 'Quicksand') {
          fontOptionEl.selected = true
        }

        this.fontsListEl.append(fontOptionEl)
      }
    }
  }

  private updateCharacterTable() {
    for (const character of characterTable[this.state.characterSet]) {
      const classes = 'flex items-center justify-center h-8 p-8 text-xl bg-indigo-900 rounded'

      const characterEl = document.createElement('div')
      characterEl.className = classes
      characterEl.innerText = character

      this.characterTableEl.append(characterEl)
    }
  }

  private updateSelectedFont(selectedFont: string) {
    this.state.selectedFont = selectedFont
  }

  private updateSelectedFontAttribute() {
    this.previewTextEl?.setAttribute('style', `font-family: ${this.state.selectedFont}`)
  }

  private loadFont() {
    const { selectedFont, selectedWeights } = this.state
    const { baseUrl } = this.state.font
    const { display, weight } = this.state.font.queryParams

    if (this.state.lastSelectedFontEl) {
      this.headEl.removeChild(this.state.lastSelectedFontEl)
    }

    const linkEl = document.createElement('link')
    linkEl.href = `${baseUrl}${selectedFont}${weight}${selectedWeights}${display}`
    linkEl.rel = 'stylesheet'

    this.state.lastSelectedFontEl = linkEl
    this.headEl?.append(linkEl)
  }

  private setFont(event: Event) {
    const selectedFont = (event.target as HTMLSelectElement).value
    this.updateSelectedFont(selectedFont)
    this.updateSelectedFontAttribute()
    this.loadFont()
  }

  private showVariableFontsOnly(event: Event) {
    this.state.showVariableFontsOnly = (event.target as HTMLInputElement).checked
    this.updateFontOptions()
    this.updateSelectedFont(this.fontsListEl.value)
    this.updateSelectedFontAttribute()
    this.loadFont()
  }

  private setFontWeights() {
    const [fontWeights] = parsedFonts
      .filter((font) => font.family === this.state.selectedFont)
      .map((font) => font.weights)

    this.fontWeightsTitleEl.innerText = `Font weights for ${this.state.selectedFont}`

    const weightNames = {
      100: 'Thin',
      200: 'Extra Light',
      300: 'Light',
      400: 'Normal',
      500: 'Medium',
      600: 'Semi Bold',
      700: 'Bold',
      800: 'Extra Bold',
      900: 'Black',
      950: 'Extra Black',
    }

    type weightOptions = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'
    let weight: weightOptions

    for (weight of fontWeights) {
      const fontWeightEl = document.createElement('div')

      const weightInputEl = document.createElement('input')
      weightInputEl.className = 'rounded'
      weightInputEl.type = 'checkbox'
      weightInputEl.name = `weight-${weight}`
      weightInputEl.id = `weight-${weight}`

      const weightLabelEl = document.createElement('label')
      weightLabelEl.className = 'ml-2'
      weightLabelEl.htmlFor = `weight-${weight}`
      weightLabelEl.innerText = `${weight} (${weightNames[weight]})`

      fontWeightEl.append(weightInputEl, weightLabelEl)

      this.fontWeightsEl.append(fontWeightEl)
    }
  }

  private setDefaultFont() {
    this.loadFont()
    this.updateSelectedFontAttribute()
    this.setFontWeights()
  }

  private async getFontURL() {
    const { characterSet, selectedFont } = this.state
    const { baseUrl } = this.state.font
    const { display, text } = this.state.font.queryParams

    const queryString = `${baseUrl}${selectedFont}${text}${characterSet}${display}`
    const isUrl = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/

    const response = await (await fetch(queryString)).text()
    const [fontURL] = response.match(isUrl) as [string]

    this.state.queryString = fontURL
    this.downloadLinkEl.href = this.state.queryString
  }
}
