const fs = require('fs')

class Fonts {
  constructor(filePath) {
    this.filePath = filePath
    this.googleFonts = this.#readJSON(this.filePath)
  }

  getVariableFonts() {
    const variableFonts = this.googleFonts
      .filter((font) => font.axes.length > 0)
      .map((font) => font.family)

    return variableFonts
  }

  parseFonts() {
    const parsedFonts = this.googleFonts.map((font) => ({
      family: font.family,
      category: font.category,
      weights: Object.keys(font.fonts),
      axes: font.axes,
    }))

    return parsedFonts
  }

  #readJSON(filePath) {
    try {
      const fonts = fs.readFileSync(filePath, 'utf-8')
      const { familyMetadataList } = JSON.parse(fonts)
      return familyMetadataList
    } catch (error) {
      throw new Error(`💩 Something went wrong: ${error}`)
    }
  }

  writeJSON(outputPath, data) {
    try {
      const fonts = JSON.stringify(data, null, 2)
      fs.writeFileSync(outputPath, fonts, 'utf8')
      console.log(`Success! 👍 Wrote to ${outputPath}.`)
    } catch (error) {
      throw new Error(`💩 Something went wrong: ${error}`)
    }
  }
}

const fonts = new Fonts('data/fonts.json')

const parsedFonts = fonts.parseFonts()
fonts.writeJSON('data/parsedFonts.json', parsedFonts)
