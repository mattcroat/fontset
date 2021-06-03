import './styles/tailwind.css'

import variableFonts from '@root/data/variableFonts.json'
import characterTable from '@root/data/characterTable.json'

interface Font {
  baseUrl: string
  queryParams: {
    display: string
    family: string
    text: string
    weight: string
  }
}

interface State {
  fontURL: string
  selectedFont: string
  lastSelectedFontEl: HTMLElement | null
  selectedCharacterSet: string
  characterSet: string
  showVariableFontsOnly: boolean
  specialCharacters: string
  queryString: string
}

const font: Font = {
  baseUrl: 'https://fonts.googleapis.com/css2',
  queryParams: {
    display: '&display=swap',
    family: '?family=',
    text: '&text=',
    weight: ':wght@400;700;900',
  },
}

const state: State = {
  fontURL: '',
  selectedFont: 'Inter',
  lastSelectedFontEl: null,
  selectedCharacterSet: '',
  characterSet: 'abcd',
  showVariableFontsOnly: false,
  specialCharacters: '',
  queryString: '',
}

const headEl = document.head
const fontsContainerEl = document.querySelector(
  '[data-fonts]'
) as HTMLDivElement
const previewTextEl = document.querySelector(
  '[data-preview-text]'
) as HTMLParagraphElement
const characterTableEl = document.querySelector(
  '[data-character-table'
) as HTMLDivElement

for (const character of characterTable['English']) {
  const divEl = document.createElement('div')
  divEl.innerText = character
  divEl.className =
    'bg-indigo-900 rounded text-xl h-8 p-8 flex justify-center items-center'
  characterTableEl?.append(divEl)
}

const selectEl = document.createElement('select')
selectEl.className = 'w-1/2 px-6 py-4 text-2xl border-none rounded-full'
selectEl.name = 'fonts'
selectEl.id = 'fonts'

for (const font of variableFonts) {
  const optionEl = document.createElement('option')
  optionEl.value = font
  optionEl.text = font
  selectEl.append(optionEl)
}

fontsContainerEl?.append(selectEl)

function loadFont(fontName: string) {
  const {
    baseUrl,
    queryParams: { display, weight },
  } = font

  if (state.lastSelectedFontEl) {
    headEl.removeChild(state.lastSelectedFontEl)
  }

  const linkEl = document.createElement('link')
  linkEl.href = `${baseUrl}${fontName}${weight}${display}`
  linkEl.rel = 'stylesheet'

  state.lastSelectedFontEl = linkEl
  headEl?.append(linkEl)
}

async function getFontURL() {
  const {
    baseUrl,
    queryParams: { text },
  } = font
  const { characterSet, selectedFont } = state

  const queryString = `${baseUrl}${selectedFont}${text}${characterSet}`
  const isUrl = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/

  const response = await (await fetch(queryString)).text()
  const [fontURL] = response.match(isUrl) as [string]

  state.queryString = fontURL
}

function updateSelectedFont(selectedFont: string) {
  state.selectedFont = selectedFont
}

function updateSelectedFontAttribute() {
  previewTextEl?.setAttribute('style', `font-family: ${state.selectedFont}`)
}

function updateFont(event: any) {
  const chosenFont = event.target.value

  updateSelectedFont(chosenFont)
  updateSelectedFontAttribute()
  loadFont(chosenFont)
}

selectEl.addEventListener('change', updateFont)
