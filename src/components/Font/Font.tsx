import React, { useEffect, useState } from 'react'

import fonts from '@root/src/data/fonts.json'
import {
  characterSet,
  characterSetDescription,
  weightDescription,
} from '@root/src/utils/helpers'

import type { CharacterSetType, WeightType } from '@root/src/types'

interface FontProps {
  selectedFont: string
  setSelectedFont: React.Dispatch<React.SetStateAction<string>>
  selectedWeights: WeightType[]
  setSelectedWeights: React.Dispatch<React.SetStateAction<WeightType[]>>
  selectedCharSet: string[]
  setSelectedCharSet: React.Dispatch<React.SetStateAction<CharacterSetType[]>>
  url: string
}

export function Font({
  selectedFont,
  setSelectedFont,
  selectedWeights,
  setSelectedWeights,
  selectedCharSet,
  setSelectedCharSet,
  url,
}: FontProps) {
  const [charSets, setCharSets] = useState<CharacterSetType[]>([])

  useEffect(() => {
    if (!url) return
    characterSet(url).then(setCharSets)
  }, [url])

  const weights = fonts.find(
    ({ family }) => family.split(' ').join('+') === selectedFont
  )?.weights as WeightType[]

  return (
    <section className="md:px-24 mt-24 space-y-8">
      <div>
        <span className="block text-2xl md:text-4xl italic">
          1. Select Google Font
        </span>
        <select
          onChange={(e) => {
            setSelectedFont(e.target.value)
            setSelectedWeights(['400'])
            setSelectedCharSet(['latin'])
          }}
          value={selectedFont}
          className="w-4/5 md:w-1/2 px-6 py-4 mt-8 text-xl md:text-2xl text-gray-800 border-none rounded-full"
          name="font"
          id="font"
        >
          {fonts.map(({ category, family }) => (
            <option key={family} value={family.split(' ').join('+')}>
              {family} ({category})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <span className="block text-xl md:text-2xl italic">Weights</span>
        <select
          onChange={(e) => {
            const weights = [...e.target.selectedOptions].map(
              ({ value }) => value
            ) as WeightType[]
            setSelectedWeights(weights)
          }}
          value={selectedWeights}
          className="w-4/5 md:w-1/2 text-black rounded scrollbar"
          name="weights"
          id="weights"
          multiple={true}
          size={weights.length}
        >
          {weights?.map((weight, index) => (
            <option
              className={`py-2 ${index % 2 === 0 && 'bg-gray-100'}`}
              key={weight}
              value={weight}
            >
              {weight} ({weightDescription[weight]})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <span className="block text-xl md:text-2xl italic">Character Set</span>
        <select
          onChange={(e) => {
            const charSets = [...e.target.selectedOptions].map(
              ({ value }) => value
            ) as CharacterSetType[]
            setSelectedCharSet(charSets)
          }}
          value={selectedCharSet}
          className="w-4/5 md:w-1/2 text-black rounded scrollbar"
          name="character-sets"
          id="character-sets"
          multiple={true}
          size={charSets.length}
        >
          {charSets?.map((charSet, index) => (
            <option
              className={`py-2 ${index % 2 === 0 && 'bg-gray-100'}`}
              key={charSet}
              value={charSet}
            >
              {charSet} ({characterSetDescription[charSet] ?? charSet})
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
