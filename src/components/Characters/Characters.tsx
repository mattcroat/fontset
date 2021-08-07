import React from 'react'

import characters from '@root/src/data/character-table.json'

export function Characters({
  language,
  setLanguage,
  specialCharacters,
  setSpecialCharacters,
}) {
  return (
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
