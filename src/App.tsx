import React, { useEffect, useState } from 'react'

import characters from '@root/src/data/character-table.json'
import fonts from '@root/src/data/fonts.json'

import { weightNames } from '@root/src/utils/helpers'
import type { WeightSizes } from './types'

function hasItalics(weights: string[]) {
  return !!weights.filter((weight) => weight.match('i'))
}

function formatWeights(weights: string[]) {
  if (!hasItalics(weights)) return weights.sort()

  return weights
    .map((weight) => {
      return weight.includes('i')
        ? `1,${weight}`.replace('i', '')
        : `0,${weight}`
    })
    .sort()
    .join(';')
}

async function parseFontURL() {
  const response = await fetch(
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&text=Hello&display=swap'
  )
  const data = await response.text()

  const parsedFonts = data
    .split('@font-face')
    .filter((font) => font.includes('font-family'))
    .map((font) => {
      const url = font
        .split(';')
        .filter((font) => font.includes('src'))
        .map((font) => font.slice(font.indexOf('(') + 1, font.indexOf(')')))
        .join('')

      const weight = font
        .split(';')
        .filter((font) => font.includes('weight'))
        .map((font) => font.split(':')[1].trim())
        .join('')

      return { url, weight }
    })

  return parsedFonts
}

export function App() {
  const [selectedFont, setSelectedFont] = useState<string>('Alegreya')
  const [variable, setVariable] = useState<boolean>(true)
  const [weights, setWeights] = useState<string[]>(['400'])
  const [language, setLanguage] = useState<string>('English')
  const [specialCharacters, setSpecialCharacters] = useState<string>('')

  useEffect(() => {
    const italics = hasItalics(weights) ? ':ital,wght@' : ':wght@'
    const baseUrl = 'https://fonts.googleapis.com/css2?family='
    const wght = formatWeights(weights)
    const text = '&text=hello'
    const display = '&display=swap'

    const linkEl = document.createElement('link')
    linkEl.rel = 'stylesheet'
    linkEl.href = `${baseUrl}${selectedFont}${italics}${wght}${text}${display}`

    document.head.append(linkEl)

    return function cleanup() {
      linkEl.remove()
    }
  }, [selectedFont, weights])

  const selectedWeights = fonts.find(({ family }) => family === selectedFont)
    ?.weights as WeightSizes[]

  return (
    <>
      <section className="px-24 mt-16 text-center">
        <h1 className="text-2xl">Fontset</h1>
        <h2 className="max-w-screen-md mx-auto mt-8 text-6xl leading-tight">
          Generate a tiny Google font to self-host.
        </h2>
        <a
          className="inline-block mt-8 text-2xl italic text-green-100 underline"
          href="https://joyofcode.xyz/using-fonts-on-the-web"
          target="_blank"
        >
          Why?
        </a>
      </section>
      <main className="text-center">
        <section className="px-24 mt-24">
          <span className="block text-4xl italic">1. Select Google Font</span>
          <select
            onChange={(e) => setSelectedFont(e.target.value)}
            value={selectedFont}
            className="w-1/2 px-6 py-4 mt-8 text-2xl text-gray-800 border-none rounded-full"
            name="font"
            id="font"
          >
            {!variable &&
              fonts.map(({ category, family }) => (
                <option key={family} value={family}>
                  {family} ({category})
                </option>
              ))}
            {variable &&
              fonts
                .filter((family) => family.axes.length > 0)
                .map(({ category, family }) => (
                  <option key={family} value={family}>
                    {family} ({category})
                  </option>
                ))}
          </select>
          <div className="mt-8 space-x-2 text-xl">
            <label htmlFor="variable">Variable Fonts</label>
            <input
              className="p-2 rounded"
              type="checkbox"
              name="variable"
              id="variable"
              checked={variable}
              onChange={() => {
                setVariable((variable) => {
                  const isVariable = !variable
                  isVariable
                    ? setSelectedFont('Alegreya')
                    : setSelectedFont('ABeeZee')
                  return isVariable
                })
              }}
            />
          </div>
          <div className="mt-8">
            <select
              onChange={(e) =>
                setWeights(
                  [...e.target.selectedOptions].map(({ value }) => value)
                )
              }
              value={weights}
              className="w-1/2 text-black rounded h-80"
              name="weights"
              id="weights"
              multiple={true}
            >
              {selectedWeights?.map((weight, index) => (
                <option
                  className={`py-2 ${index % 2 === 0 && 'bg-gray-100'}`}
                  key={weight}
                  value={weight}
                >
                  {weight} ({weightNames[weight]})
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="py-16 mt-24 bg-gradient-to-r from-indigo-600 to-blue-600 clip-slant">
          <span className="block text-4xl italic">2. Select Character Set</span>
          <div className="px-24">
            <select
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
              className="w-1/2 px-6 py-4 my-8 text-2xl text-gray-800 border-none rounded-full"
              name="characters"
              id="characters"
            >
              <option value="English">English</option>
            </select>
            <div className="grid gap-8 mt-8 grid-cols-fluid">
              {characters['English'].map((character) => (
                <div
                  key={character}
                  className="flex items-center justify-center h-8 p-8 text-xl bg-indigo-900 rounded"
                >
                  {character}
                </div>
              ))}
            </div>
            <div className="my-16">
              <p className="text-4xl italic capitalize">
                Need special characters?
              </p>
              <input
                onChange={(e) => setSpecialCharacters(e.target.value)}
                value={specialCharacters}
                className="w-1/2 px-6 py-4 mt-8 text-2xl text-gray-800 placeholder-gray-400 border-none rounded-full"
                type="text"
                placeholder="e.g. diacritics, greek letters, symbols..."
              />
            </div>
          </div>
        </section>

        <section className="px-24 pb-16 my-24">
          <h3 className="text-4xl italic">3. Editable Preview</h3>
          <div className="mt-8 border-4 border-blue-400 border-dashed rounded">
            <p
              className="p-8 text-4xl"
              contentEditable={true}
              suppressContentEditableWarning={true}
              spellCheck={false}
              style={{ fontFamily: selectedFont }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
          <svg
            className="w-24 h-24 mx-auto mt-16 text-blue-400"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
          </svg>
          <button className="inline-block px-6 py-4 mt-16 text-2xl capitalize transition-all transform rounded-full cursor-pointer bg-gray-50 hover:shadow-md hover:-translate-y-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              May I have the font, pretty please
            </span>
          </button>
        </section>
      </main>
      <footer className="py-4 text-center text-green-100">
        Made with 🍜 by {''}
        <a className="underline" href="https://github.com/mattcroat">
          Matia
        </a>
        . Source code on on {''}
        <a className="underline" href="https://github.com/mattcroat/fontset">
          GitHub
        </a>
        .
      </footer>
    </>
  )
}
