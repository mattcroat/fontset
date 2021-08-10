function isJSON(file) {
  return Boolean(file && file.endsWith('.json'))
}

async function readJSON(file) {
  if (!isJSON(file)) {
    throw new Error(`💩 ${file} isn't *.json`)
  }

  try {
    const data = fs.readFileSync(file, 'utf-8')
    const deserializedData = JSON.parse(data)
    return deserializedData
  } catch (error) {
    throw new Error(`💩 Something went wrong: ${error}`)
  }
}

async function writeJSON(file, data) {
  if (!isJSON(file)) {
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

module.exports = {
  readJSON,
  writeJSON,
}
