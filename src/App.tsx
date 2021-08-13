import React, { useEffect, useState } from 'react'

import { Heading } from '@root/src/components/Heading'
import { Font } from '@root/src/components/Font'
import { Characters } from '@root/src/components/Characters'
import { Preview } from '@root/src/components/Preview'
import { Download } from '@root/src/components/Download'
import { Footer } from '@root/src/components/Footer'
import { createDownload, createLink } from '@root/src/utils/helpers'

import type { LanguageType, WeightType } from './types'

export function App() {
  const [selectedFont, setSelectedFont] = useState<string>('Alegreya')
  const [variable, setVariable] = useState<boolean>(true)
  const [weights, setWeights] = useState<WeightType[]>([])
  const [language, setLanguage] = useState<LanguageType>('English')
  const [specialCharacters, setSpecialCharacters] = useState<string>('')
  const [downloadUrl, setDownloadUrl] = useState<string>('')

  useEffect(() => {
    if (!selectedFont || weights.length < 1) return

    const { url, linkEl } = createLink(
      selectedFont,
      weights,
      language,
      specialCharacters
    )

    createDownload(selectedFont, url).then(setDownloadUrl)

    return function cleanup() {
      linkEl.remove()
    }
  }, [language, selectedFont, specialCharacters, weights])

  return (
    <>
      <Heading />
      <main className="text-center">
        <Font
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          variable={variable}
          setVariable={setVariable}
          weights={weights}
          setWeights={setWeights}
        />
        <Characters
          language={language}
          setLanguage={setLanguage}
          specialCharacters={specialCharacters}
          setSpecialCharacters={setSpecialCharacters}
        />
        <Preview selectedFont={selectedFont} />
        <Download downloadUrl={downloadUrl} selectedFont={selectedFont} />
      </main>
      <Footer />
    </>
  )
}
