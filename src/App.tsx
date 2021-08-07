import React, { useEffect, useState } from 'react'

import { Heading } from '@root/src/components/Heading'
import { Font } from '@root/src/components/Font'
import { Characters } from '@root/src/components/Characters'
import { Preview } from '@root/src/components/Preview'
import { Footer } from '@root/src/components/Footer'

import { createLink } from '@root/src/utils/helpers'

export function App() {
  const [selectedFont, setSelectedFont] = useState<string>('Alegreya')
  const [variable, setVariable] = useState<boolean>(true)
  const [weights, setWeights] = useState<string[]>(['400'])
  const [language, setLanguage] = useState<string>('English')
  const [specialCharacters, setSpecialCharacters] = useState<string>('')

  useEffect(() => {
    const { linkEl } = createLink(
      selectedFont,
      weights,
      language,
      specialCharacters
    )

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
        <Preview selectedFont={selectedFont} />
      </main>
      <Footer />
    </>
  )
}
