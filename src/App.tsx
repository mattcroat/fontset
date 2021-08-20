import React, { useEffect, useState } from 'react'

import { Heading } from '@root/src/components/Heading'
import { Font } from '@root/src/components/Font'
import { Preview } from '@root/src/components/Preview'
import { Download } from '@root/src/components/Download'
import { Footer } from '@root/src/components/Footer'
import { createLink, fontRequest } from '@root/src/utils/helpers'

import { CharacterSetType, WeightType } from './types'

export function App() {
  const [selectedFont, setSelectedFont] = useState<string>('Alegreya')
  const [selectedWeights, setSelectedWeights] = useState<WeightType[]>(['400'])
  const [selectedCharSet, setSelectedCharSet] = useState<CharacterSetType[]>([
    'latin',
  ])
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    const url = fontRequest(selectedFont, selectedWeights)
    const link = createLink(url)
    setUrl(url)

    return function cleanup() {
      link.remove()
    }
  }, [selectedFont, selectedWeights, selectedCharSet])

  return (
    <>
      <Heading />
      <main className="text-center">
        <Font
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          selectedWeights={selectedWeights}
          setSelectedWeights={setSelectedWeights}
          selectedCharSet={selectedCharSet}
          setSelectedCharSet={setSelectedCharSet}
          url={url}
        />
        <Preview
          selectedFont={selectedFont}
          selectedWeights={selectedWeights}
        />
        <Download
          selectedFont={selectedFont}
          selectedCharSet={selectedCharSet}
          url={url}
        />
      </main>
      <Footer />
    </>
  )
}
