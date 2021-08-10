const fs = require('fs')
const fetch = require('node-fetch')
const { parse } = require('node-html-parser')

async function getPages() {
  const pages = []

  const response = await fetch('https://character-table.netlify.app/')

  if (!response.ok) {
    throw new Error(`💩 Something went wrong: ${error}`)
  }

  const page = await response.text()
  const html = parse(page)
  const linksEl = html.querySelectorAll('#content > ul:first-of-type > li > a')

  for (const link of linksEl) {
    pages.push({
      name: link.text,
      url: `https://character-table.netlify.app${link.rawAttributes.href}`,
    })
  }

  return pages
}

async function characterTable(pages) {
  if (!pages) throw new Error('💩 Missing argument `pages`')

  let currentPage = 0
  let characterTable = {}

  for (const { name, url } of pages) {
    const pageCount = pages.length

    currentPage += 1
    console.log(`🧙‍♂️ [${currentPage}/${pageCount}] Parsing ${url}...`)

    const response = await fetch(encodeURI(url))

    if (!response.ok) {
      throw new Error(`💩 Something went wrong: ${error}`)
    }

    const page = await response.text()
    const html = parse(page)
    const characters = html.querySelectorAll('.character')

    const languageCharacters = []
    for (const character of characters) {
      languageCharacters.push(character.text)
    }

    characterTable[name] = languageCharacters

    console.log(`✅ Done.`)
  }

  return characterTable
}

async function writeJSON(file, data) {
  if (!file || !file.endsWith('.json')) {
    throw new Error(`💩 ${file} isn't *.json`)
  }

  if (!data) {
    throw new Error('💩 Missing argument `data`')
  }

  try {
    const serializedData = JSON.stringify(data, null, 2)
    fs.writeFileSync(file, serializedData, 'utf8')
    console.log(`Success! 👍 Wrote to ${file}.`)
  } catch (error) {
    throw new Error(`💩 Something went wrong: ${error}`)
  }
}

async function outputCharacterTable() {
  const pages = await getPages()
  const table = await characterTable(pages)
  writeJSON('src/data/character-table.json', table)
}

outputCharacterTable()
