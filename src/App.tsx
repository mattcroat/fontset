import React, { useEffect, useState } from 'react'

import { Heading } from '@root/src/components/Heading'
import { Font } from '@root/src/components/Font'
import { Preview } from '@root/src/components/Preview'
import { Download } from '@root/src/components/Download'
import { Footer } from '@root/src/components/Footer'
import {
  createDownload,
  createLink,
  fontRequest,
} from '@root/src/utils/helpers'

import { WeightType } from './types'

export function App() {
  const [selectedFont, setSelectedFont] = useState<string>('Alegreya')
  const [weights, setWeights] = useState<WeightType[]>([])
  const [download, setDownload] = useState<string>('')

  useEffect(() => {
    if (!selectedFont || weights.length < 1) return

    const url = fontRequest(selectedFont, weights)
    const link = createLink(url)
    createDownload(url).then(setDownload)

    return function cleanup() {
      link.remove()
    }
  }, [selectedFont, weights])

  return (
    <>
      <Heading />
      <main className="text-center">
        <Font
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          weights={weights}
          setWeights={setWeights}
        />
        <Preview selectedFont={selectedFont} />
        <Download download={download} selectedFont={selectedFont} />
      </main>
      <Footer />
    </>
  )
}
