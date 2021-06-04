import type { State } from '@root/src/types'

import characterTable from '@root/data/characterTable.json'
import variableFonts from '@root/data/variableFonts.json'

export class App {
  state: State = {
    characterSet: 'English',
    font: {
      baseUrl: 'https://fonts.googleapis.com/css2?family=',
      queryParams: {
        display: '&display=swap',
        text: '&text=',
        weight: ':wght@400;700;900',
      },
    },
    fontURL: '',
    lastSelectedFontEl: null,
    queryString: '',
    selectedCharacterSet: '',
    selectedFont: 'Inter',
    showVariableFontsOnly: false,
    specialCharacters: '',
  }

  characterTableEl = document.querySelector('[data-character-table]') as HTMLDivElement
  downloadLinkEl = document.querySelector('[data-download-link]') as HTMLLinkElement
  fontsListEl = document.querySelector('[data-fonts-list]') as HTMLSelectElement
  headEl = document.head
  previewTextEl = document.querySelector('[data-preview-text]') as HTMLParagraphElement

  public showCharacterTable() {
    for (const character of characterTable[this.state.characterSet]) {
      const classes = 'bg-indigo-900 rounded text-xl h-8 p-8 flex justify-center items-center'

      const characterEl = document.createElement('div')
      characterEl.className = classes
      characterEl.innerText = character

      this.characterTableEl.append(characterEl)
    }
  }

  public showFontOptions() {
    for (const font of variableFonts) {
      const fontOptionEl = document.createElement('option')
      fontOptionEl.value = font
      fontOptionEl.text = font

      this.fontsListEl.append(fontOptionEl)
    }
  }

  public loadFont(fontName: string) {
    const {
      baseUrl,
      queryParams: { display, weight },
    } = this.state.font

    if (this.state.lastSelectedFontEl) {
      this.headEl.removeChild(this.state.lastSelectedFontEl)
    }

    const linkEl = document.createElement('link')
    linkEl.href = `${baseUrl}${fontName}${weight}${display}`
    linkEl.rel = 'stylesheet'

    this.state.lastSelectedFontEl = linkEl
    this.headEl?.append(linkEl)
  }

  public async getFontURL() {
    const {
      baseUrl,
      queryParams: { display, text },
    } = this.state.font
    const { characterSet, selectedFont } = this.state

    const queryString = `${baseUrl}${selectedFont}${text}${characterSet}${display}`
    const isUrl = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/

    const response = await (await fetch(queryString)).text()
    const [fontURL] = response.match(isUrl) as [string]

    this.state.queryString = fontURL
    this.downloadLinkEl.href = this.state.queryString
  }

  public updateSelectedFont(selectedFont: string) {
    this.state.selectedFont = selectedFont
  }

  public updateSelectedFontAttribute() {
    this.previewTextEl?.setAttribute('style', `font-family: ${this.state.selectedFont}`)
  }

  public updateFont(event: any) {
    const chosenFont = event.target.value

    this.updateSelectedFont(chosenFont)
    this.updateSelectedFontAttribute()
    this.loadFont(chosenFont)
  }
}
