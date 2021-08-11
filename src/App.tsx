import React, { useEffect, useState } from 'react'

import { Heading } from '@root/src/components/Heading'
import { Font } from '@root/src/components/Font'
import { Characters } from '@root/src/components/Characters'
import { Preview } from '@root/src/components/Preview'
import { Download } from '@root/src/components/Download'
import { Footer } from '@root/src/components/Footer'
import { createLink, parseURL } from '@root/src/utils/helpers'

import type { DownloadType, LanguageType, WeightType } from './types'

export function App() {
  const [selectedFont, setSelectedFont] = useState<string>('Alegreya')
  const [variable, setVariable] = useState<boolean>(true)
  const [weights, setWeights] = useState<WeightType[]>(['400'])
  const [language, setLanguage] = useState<LanguageType>('English')
  const [specialCharacters, setSpecialCharacters] = useState<string>('')
  const [download, setDownload] = useState<DownloadType[]>()
  const [showDownload, setShowDownload] = useState<boolean>(false)

  useEffect(() => {
    const { url, linkEl } = createLink(
      selectedFont,
      weights,
      language,
      specialCharacters
    )

    parseURL(url).then(setDownload)

    return function cleanup() {
      linkEl.remove()
    }
  }, [selectedFont, specialCharacters, weights])

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
        <Preview
          selectedFont={selectedFont}
          setShowDownload={setShowDownload}
        />
        {showDownload && (
          <Download download={download} selectedFont={selectedFont} />
        )}
      </main>
      <Footer />
    </>
  )
}
