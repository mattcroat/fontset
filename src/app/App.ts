import type { Font, State, WeightSizes } from '@root/src/types'
import { weightNames } from '@root/src/utils/helpers'

import characterTable from '@root/data/characterTable.json'
import parsedFonts from '@root/data/parsedFonts.json'

const fontSelectionContainerEl = document.querySelector(
  '[data-font-selection]'
) as HTMLDivElement

class FontSelection {
  constructor(
    private containerEl: HTMLDivElement,
    private parsedFonts: Font[]
  ) {}

  selectedFont: string = 'Inter'
  showVariableFonts: boolean = false
  weights: Set<WeightSizes> = new Set()

  private title() {
    const titleEl = document.createElement('h3')
    titleEl.className = 'text-4xl italic'
    titleEl.innerText = '1. Select Google font'
    return titleEl
  }

  private fontList() {
    const fontsEl = document.createElement('select')
    fontsEl.className =
      'w-1/2 px-6 py-4 mt-8 text-2xl text-gray-800 border-none rounded-full'

    for (const { axes, category, family } of this.parsedFonts) {
      if (!this.showVariableFonts) {
        const fontEl = document.createElement('option')
        fontEl.text = `${family} (${category})`
        fontEl.value = family

        if (family === this.selectedFont) {
          fontEl.selected = true
        }

        fontsEl.append(fontEl)
      }

      if (this.showVariableFonts && axes.length > 0) {
        const fontEl = document.createElement('option')
        fontEl.text = `${family} (${category})`
        fontEl.value = family

        if (family === this.selectedFont) {
          fontEl.selected = true
        }

        fontsEl.append(fontEl)
      }
    }

    fontsEl.onchange = (event: Event) => {
      this.selectedFont = (event.target as HTMLOptionElement).value
      this.update()
    }

    return fontsEl
  }

  private variableFontsCheckbox() {
    const containerEl = document.createElement('div')
    containerEl.className = 'mt-8 space-x-2 text-xl'

    const checkboxEl = document.createElement('input')
    checkboxEl.className = 'p-2 rounded'
    checkboxEl.type = 'checkbox'
    checkboxEl.id = 'variable-fonts'
    checkboxEl.name = 'variable-fonts'
    checkboxEl.checked = this.showVariableFonts

    checkboxEl.onchange = (event: Event) => {
      this.showVariableFonts = (event.target as HTMLInputElement).checked
      this.update()
    }

    const labelEl = document.createElement('label')
    labelEl.htmlFor = 'variable-fonts'
    labelEl.innerText = 'Show variable fonts only'

    containerEl.append(checkboxEl, labelEl)

    return containerEl
  }

  private fontWeights() {
    const [fontWeights] = this.parsedFonts
      .filter((font) => font.family === this.selectedFont)
      .map((font) => font.weights)

    const containerEl = document.createElement('div')
    containerEl.className =
      'p-4 mx-auto my-16 capitalize border border-indigo-500 rounded max-w-max'

    const fontWeightsEl = document.createElement('div')
    fontWeightsEl.className =
      'grid grid-flow-col grid-rows-3 mx-auto text-xl text-left gap-4'

    fontWeightsEl.onchange = (event: Event) => {
      const targetEl = event.target as HTMLInputElement

      if (targetEl.type === 'checkbox') {
        if (!targetEl.dataset.weight) return

        if (targetEl.checked) {
          this.weights.add(targetEl.dataset.weight)
        } else {
          this.weights.delete(targetEl.dataset.weight)
        }
      }
    }

    let weight: WeightSizes

    for (weight of fontWeights) {
      const divEl = document.createElement('div')

      const checkboxEl = document.createElement('input')
      checkboxEl.className = 'rounded'
      checkboxEl.type = 'checkbox'
      checkboxEl.name = `weight-${weight}`
      checkboxEl.id = `weight-${weight}`
      checkboxEl.setAttribute('data-weight', weight)

      const labelEl = document.createElement('label')
      labelEl.className = 'ml-2'
      labelEl.htmlFor = `weight-${weight}`
      labelEl.innerText = `${weight} (${weightNames[weight]})`

      divEl.append(checkboxEl, labelEl)
      fontWeightsEl.append(divEl)
    }

    containerEl.append(fontWeightsEl)

    return containerEl
  }

  public render() {
    this.containerEl.append(
      this.title(),
      this.fontList(),
      this.variableFontsCheckbox(),
      this.fontWeights()
    )
  }

  public update() {
    this.containerEl.innerHTML = ''
    this.render()
  }
}

const fontSelection = new FontSelection(fontSelectionContainerEl, parsedFonts)
fontSelection.render()

export class App {
  private state: State = {
    characterSet: 'English',
    fontURL: '',
    fontWeights: new Set(),
    lastSelectedFontEl: null,
    queryString: '',
    selectedCharacterSet: '',
    selectedFont: 'Quicksand',
    selectedWeights: '400',
    showVariableFontsOnly: false,
    specialCharacters: '',
  }

  private headEl = document.head

  private fontsListEl = document.querySelector(
    '[data-fonts-list]'
  ) as HTMLSelectElement
  private fontWeightsEl = document.querySelector(
    '[data-font-weights]'
  ) as HTMLDivElement
  private variableFontsCheckboxEl = document.querySelector(
    '[data-variable-fonts]'
  ) as HTMLInputElement

  private characterTableEl = document.querySelector(
    '[data-character-table]'
  ) as HTMLDivElement

  private previewTextEl = document.querySelector(
    '[data-preview-text]'
  ) as HTMLParagraphElement
  private downloadLinkEl = document.querySelector(
    '[data-download-link]'
  ) as HTMLLinkElement

  public init() {
    this.updateFontOptions()
    this.updateCharacterTable()
    this.setDefaultFont()

    this.fontsListEl.onchange = (event) => this.setFont(event)
    this.fontWeightsEl.onchange = (event) =>
      this.updateSelectedFontWeights(event)
    this.variableFontsCheckboxEl.onchange = (event) =>
      this.showVariableFontsOnly(event)
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
      const classes =
        'flex items-center justify-center h-8 p-8 text-xl bg-indigo-900 rounded'

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
    this.previewTextEl?.setAttribute(
      'style',
      `font-family: ${this.state.selectedFont}`
    )
  }

  private loadFont() {
    const { selectedFont, selectedWeights } = this.state

    if (this.state.lastSelectedFontEl) {
      this.headEl.removeChild(this.state.lastSelectedFontEl)
    }

    const linkEl = document.createElement('link')
    linkEl.href = `https://fonts.googleapis.com/css2?family=${selectedFont}:wght@${selectedWeights}&display=swap`
    linkEl.rel = 'stylesheet'

    this.state.lastSelectedFontEl = linkEl
    this.headEl?.append(linkEl)
  }

  private setFont(event: Event) {
    const selectedFont = (event.target as HTMLSelectElement).value
    this.updateSelectedFont(selectedFont)
    this.updateFontWeightsList()
    this.updateSelectedFontAttribute()
    this.loadFont()
  }

  private showVariableFontsOnly(event: Event) {
    this.state.showVariableFontsOnly = (event.target as HTMLInputElement).checked
    this.updateFontOptions()
    this.updateSelectedFont(this.fontsListEl.value)
    this.updateSelectedFontAttribute()
    this.updateFontWeightsList()
    this.loadFont()
  }

  private updateFontWeightsList() {
    this.fontWeightsEl.innerHTML = ''

    const [fontWeights] = parsedFonts
      .filter((font) => font.family === this.state.selectedFont)
      .map((font) => font.weights)

    let weight: WeightSizes

    for (weight of fontWeights) {
      const fontWeightEl = document.createElement('div')

      const weightInputEl = document.createElement('input')
      weightInputEl.className = 'rounded'
      weightInputEl.type = 'checkbox'
      weightInputEl.name = `weight-${weight}`
      weightInputEl.id = `weight-${weight}`
      weightInputEl.setAttribute('data-weight', weight)

      const weightLabelEl = document.createElement('label')
      weightLabelEl.className = 'ml-2'
      weightLabelEl.htmlFor = `weight-${weight}`
      weightLabelEl.innerText = `${weight} (${weightNames[weight]})`

      fontWeightEl.append(weightInputEl, weightLabelEl)

      this.fontWeightsEl.append(fontWeightEl)
    }
  }

  private updateSelectedFontWeights(event: Event) {
    const targetEl = event.target as HTMLInputElement

    if (targetEl.type === 'checkbox') {
      if (!targetEl.dataset.weight) return

      if (targetEl.checked) {
        this.state.fontWeights.add(targetEl.dataset.weight)
      } else {
        this.state.fontWeights.delete(targetEl.dataset.weight)
      }
    }

    const sortedWeights = [...this.state.fontWeights].sort().join(';')
    this.state.selectedWeights = sortedWeights
  }

  private setDefaultFont() {
    this.loadFont()
    this.updateSelectedFontAttribute()
    this.updateFontWeightsList()
  }

  private async getFontURL() {
    const { characterSet, selectedFont } = this.state

    const queryString = `https://fonts.googleapis.com/css2?family=${selectedFont}&text=${characterSet}&display=swap`
    const isUrl = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/

    const response = await (await fetch(queryString)).text()
    const [fontURL] = response.match(isUrl) as [string]

    this.state.queryString = fontURL
    this.downloadLinkEl.href = this.state.queryString
  }
}
