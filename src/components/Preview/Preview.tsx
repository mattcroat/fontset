import React from 'react'

interface PreviewProps {
  selectedFont: string
}

export function Preview({ selectedFont }: PreviewProps) {
  return (
    <section className="px-24 pb-16 my-24">
      <h3 className="text-4xl italic">2. Preview (Editable Text)</h3>
      <div className="mt-8 border-4 border-blue-400 border-dashed rounded">
        <p
          className="p-8 text-4xl"
          contentEditable={true}
          suppressContentEditableWarning={true}
          spellCheck={false}
          style={{ fontFamily: selectedFont }}
        >
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </section>
  )
}
