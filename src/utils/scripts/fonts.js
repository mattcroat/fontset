const { readJSON, writeJSON } = require('./json')

function getVariableFonts(fonts) {
  const variableFonts = fonts
    .filter((font) => font.axes.length > 0)
    .map((font) => font.family)

  return variableFonts
}

function parseFonts(fonts) {
  const parsedFonts = fonts.map((font) => ({
    family: font.family,
    category: font.category,
    weights: Object.keys(font.fonts),
    axes: font.axes,
  }))

  return parsedFonts
}

async function outputFonts() {
  const { familyMetadataList } = readJSON('src/data/fonts.json')
  const parsedFonts = parseFonts(familyMetadataList)
  writeJSON('src/data/parsedFonts.json', parsedFonts)
}

outputFonts()
