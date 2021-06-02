import './styles/tailwind.css'

import variableFonts from '@root/data/variableFonts.json'
import characterTable from '@root/data/characterTable.json'

const state = {
  selectedFont: '',
  fontUrl: {
    baseUrl: 'https://fonts.googleapis.com/css2?family=',
    weight: ':wght@400;700;900',
    display: '&display=swap',
  },
  lastFontEl: '',
}

const headEl = document.head
const fontsContainerEl = document.querySelector('[data-fonts]')
const previewTextEl = document.querySelector('[data-preview-text]')
const characterTableEl = document.querySelector('[data-character-table')

for (const character of characterTable['English']) {
  const divEl = document.createElement('div')
  divEl.innerText = character
  divEl.className =
    'bg-blue-900 rounded text-xl h-8 p-8 flex justify-center items-center'
  characterTableEl?.append(divEl)
}

const selectEl = document.createElement('select')
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
  const { baseUrl, weight, display } = state.fontUrl

  if (state.lastFontEl) {
    headEl.removeChild(state.lastFontEl)
  }

  const linkEl = document.createElement('link')
  linkEl.href = `${baseUrl}${fontName}${weight}${display}`
  linkEl.rel = 'stylesheet'

  state.lastFontEl = linkEl
  headEl?.append(linkEl)
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
