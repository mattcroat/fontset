import React from 'react'

import languages from '@root/src/data/character-table.json'

import type { LanguageType } from '@root/src/types'

interface CharactersProps {
  language: LanguageType
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>
  specialCharacters: string
  setSpecialCharacters: React.Dispatch<React.SetStateAction<string>>
}

export function Characters({
  language,
  setLanguage,
  specialCharacters,
  setSpecialCharacters,
}: CharactersProps) {
  return (
    <section className="py-16 mt-24 bg-gradient-to-r from-indigo-600 to-blue-600 clip-slant">
      <span className="block text-4xl italic">2. Select Character Set</span>
      <div className="px-24">
        <select
          onChange={(e) => {
            const selectedLanguage = e.target.value as LanguageType
            setLanguage(selectedLanguage)
          }}
          value={language}
          className="w-1/2 px-6 py-4 my-8 text-2xl text-gray-800 border-none rounded-full"
          name="characters"
          id="characters"
        >
          {Object.keys(languages).map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        <div className="grid gap-8 mt-8 grid-cols-fluid">
          {languages[language].map((character) => (
            <div
              key={character}
              className="flex items-center justify-center h-8 p-8 text-xl bg-indigo-900 rounded"
            >
              {character}
            </div>
          ))}
        </div>
        <div className="my-16">
          <p className="text-4xl italic capitalize">Need special characters?</p>
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
  )
}
