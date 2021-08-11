import React from 'react'

interface PreviewProps {
  selectedFont: string
  setShowDownload: React.Dispatch<React.SetStateAction<boolean>>
}

export function Preview({ selectedFont, setShowDownload }: PreviewProps) {
  return (
    <section className="px-24 pb-16 my-24">
      <h3 className="text-4xl italic">3. Editable Preview</h3>
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
      <svg
        className="w-24 h-24 mx-auto mt-16 text-blue-400"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
      </svg>
      <button
        onClick={() => setShowDownload(true)}
        className="inline-block px-6 py-4 mt-16 text-2xl capitalize transition-all rounded-full cursor-pointer bg-gray-50 hover:shadow-md hover:-translate-y-1"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
          May I have the font, pretty please
        </span>
      </button>
    </section>
  )
}
