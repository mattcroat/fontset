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

  private readJSON(filePath: string) {
    try {
      const fonts = fs.readFileSync(filePath, 'utf-8')
      const { familyMetadataList } = JSON.parse(fonts)
      return familyMetadataList
    } catch (error) {
      console.error(`Ooops! ${error}`)
    }
  }

  public writeJSON(outputPath: string, data: any) {
    try {
      const fonts = JSON.stringify(data, null, 2)
      fs.writeFileSync(outputPath, fonts, 'utf8')
    } catch (error) {
      console.error(`Ooops! ${error}`)
    }
  }
}

const fonts = new Fonts('data/fonts.json')

const variableFonts = fonts.getVariableFonts()
fonts.writeJSON('data/variableFonts.json', variableFonts)
