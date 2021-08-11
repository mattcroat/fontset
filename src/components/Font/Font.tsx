import React from 'react'

import fonts from '@root/src/data/fonts.json'
import { weightLabel } from '@root/src/utils/helpers'

import type { WeightType } from '@root/src/types'

interface FontProps {
  selectedFont: string
  setSelectedFont: React.Dispatch<React.SetStateAction<string>>
  variable: boolean
  setVariable: React.Dispatch<React.SetStateAction<boolean>>
  weights: WeightType[]
  setWeights: React.Dispatch<React.SetStateAction<WeightType[]>>
}

export function Font({
  selectedFont,
  setSelectedFont,
  variable,
  setVariable,
  weights,
  setWeights,
}: FontProps) {
  const selectedWeights = fonts.find(({ family }) => family === selectedFont)
    ?.weights as WeightType[]

  return (
    <section className="px-24 mt-24">
      <span className="block text-4xl italic">1. Select Google Font</span>
      <select
        onChange={(e) => {
          setWeights(['400'])
          setSelectedFont(e.target.value)
        }}
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
          onChange={(e) => {
            const selectedWeights = [...e.target.selectedOptions].map(
              ({ value }) => value
            ) as WeightType[]
            setWeights(selectedWeights)
          }}
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
              {weight} ({weightLabel[weight]})
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
