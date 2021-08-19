import React, { useEffect, useState } from 'react'

import { createDownload, createStyles } from '@root/src/utils/helpers'

import type { CharacterSetType } from '@root/src/types'

interface DownloadProps {
  selectedFont: string
  selectedCharSet: CharacterSetType[]
  url: string
}

export function Download({
  selectedFont,
  selectedCharSet,
  url,
}: DownloadProps) {
  const [download, setDownload] = useState<string>('')
  const [styles, setStyles] = useState<string>('')

  useEffect(() => {
    if (!url) return
    createDownload(url).then(setDownload)
    createStyles(selectedCharSet, url).then(setStyles)
  }, [selectedCharSet, url])

  return (
    <section className="px-8 md:px-24 pb-16 ">
      <svg
        className="w-24 h-24 mx-auto text-blue-400"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z" />
      </svg>
      <a
        href={download}
        download={`${selectedFont}.zip`}
        className="inline-block px-6 py-4 mt-16 text-xl md:text-2xl capitalize transition-all rounded-full cursor-pointer bg-gray-50 hover:shadow-md hover:-translate-y-1"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
          May I have the font, pretty please
        </span>
      </a>
      <div className="max-w-2xl bg-gradient-to-tl from-indigo-600 to-blue-600 p-8 mt-16 mx-auto text-left rounded shadow-md relative">
        <button
          onClick={() => navigator.clipboard.writeText(styles)}
          className="absolute right-8 bg-indigo-400 px-4 py-2 rounded hover:shadow-md active:scale-105"
        >
          📋
        </button>
        <pre className="whitespace-pre-wrap">{styles}</pre>
      </div>
    </section>
  )
}
