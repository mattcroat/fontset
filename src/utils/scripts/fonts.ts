import fs from 'fs'

class Fonts {
  private googleFonts: any[]
  private filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
    this.googleFonts = this.readJSON(this.filePath)
  }

  public getVariableFonts() {
    const variableFonts = this.googleFonts
      .filter((font) => font.axes.length > 0)
      .map((font) => font.family)

    return variableFonts
  }

  public parseFonts() {
    const parsedFonts = this.googleFonts.map((font) => ({
      family: font.family,
      category: font.category,
      weights: Object.keys(font.fonts),
      axes: font.axes,
    }))

    return parsedFonts
  }

  private readJSON(filePath: string) {
    try {
      const fonts = fs.readFileSync(filePath, 'utf-8')
      const { familyMetadataList } = JSON.parse(fonts)
      return familyMetadataList
    } catch (error) {
      throw new Error(`💩 Something went wrong: ${error}`)
    }
  }

  public writeJSON(outputPath: string, data: any) {
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
