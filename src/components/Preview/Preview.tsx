import React from 'react'

import type { WeightType } from '@root/src/types'

interface PreviewProps {
  selectedFont: string
  selectedWeights: WeightType[]
}

export function Preview({ selectedFont, selectedWeights }: PreviewProps) {
  return (
    <section className="px-8 md:px-24 pb-16 mt-24">
      <span className="text-2xl md:text-4xl italic">2. Preview & Download</span>
      <div className="mt-8 text-left border-t-2 border-blue-400 md:max-w-2xl md:mx-auto">
        {selectedWeights.map((selectedWeight) => (
          <div className="p-4 border-b-2 border-blue-400">
            <p className="text-green-100">{selectedWeight}</p>
            <p
              className="mt-2 text-2xl md:text-4xl"
              contentEditable={true}
              suppressContentEditableWarning={true}
              spellCheck={false}
              style={{
                fontFamily: selectedFont,
                fontWeight: +selectedWeight.replace('i', ''),
                fontStyle: selectedWeight.match(/i/) ? 'italic' : 'normal',
              }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
