import React, { useEffect, useState } from 'react'

import { characterSet, weightLabel } from '@root/src/utils/helpers'
import fonts from '@root/src/data/fonts.json'

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
  const [charSets, setCharSets] = useState<string[]>([])

  useEffect(() => {
    if (!url) return
    characterSet(url).then(setCharSets)
  }, [url])

  const weights = fonts.find(({ family }) => family === selectedFont)
    ?.weights as WeightType[]

  return (
    <section className="px-24 mt-24 space-y-8">
      <div>
        <span className="block text-4xl italic">1. Select Google Font</span>
        <select
          onChange={(e) => {
            setSelectedFont(e.target.value)
            setSelectedWeights(['400'])
            setSelectedCharSet(['latin'])
          }}
          value={selectedFont}
          className="w-1/2 px-6 py-4 mt-8 text-2xl text-gray-800 border-none rounded-full"
          name="font"
          id="font"
        >
          {fonts.map(({ category, family }) => (
            <option key={family} value={family}>
              {family} ({category})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <span className="block text-2xl italic">Weights</span>
        <select
          onChange={(e) => {
            const weights = [...e.target.selectedOptions].map(
              ({ value }) => value
            ) as WeightType[]
            setSelectedWeights(weights)
          }}
          value={selectedWeights}
          className="w-1/2 text-black rounded h-80"
          name="weights"
          id="weights"
          multiple={true}
        >
          {weights?.map((weight, index) => (
            <option
              className={`py-2 ${index % 2 === 0 && 'bg-gray-100'}`}
              key={weight}
              value={weight}
            >
              {weight} ({weightLabel[weight]})
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <span className="block text-2xl italic">Character Sets</span>
        <select
          onChange={(e) => {
            const charSets = [...e.target.selectedOptions].map(
              ({ value }) => value
            ) as CharacterSetType[]
            setSelectedCharSet(charSets)
          }}
          value={selectedCharSet}
          className="w-1/2 text-black rounded h-80"
          name="character-sets"
          id="character-sets"
          multiple={true}
        >
          {charSets?.map((charSet, index) => (
            <option
              className={`py-2 ${index % 2 === 0 && 'bg-gray-100'}`}
              key={charSet}
              value={charSet}
            >
              {charSet}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
