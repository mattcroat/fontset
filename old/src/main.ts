import { CharacterSet, SelectFont } from '@root/src/app'

import '@root/src/styles/tailwind.css'

// The Google fonts data is parsed from a JSON file
// downloaded from Google Fonts using the network tab

// The complete file can be found in `/data/fonts.json`

// The character table is parsed from from https://characte-table.netlify.app/

// To generate these files use `npm run script`
import characterTable from '@root/data/characterTable.json'
import parsedFonts from '@root/data/parsedFonts.json'

const fontContainerEl = document.querySelector(
  '[data-section="select-font"]'
) as HTMLDivElement
const charactersContainerEl = document.querySelector(
  '[data-section="character-set"]'
) as HTMLDivElement

const font = new SelectFont(fontContainerEl, parsedFonts)
font.render()

const characters = new CharacterSet(charactersContainerEl, characterTable)
characters.render()
