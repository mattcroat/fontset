import React from 'react'

export function Download({ download, selectedFont }) {
  return (
    <section className="px-24 pb-16 my-24">
      <ol className="max-w-sm mx-auto space-y-4">
        {download?.sort().map(({ style, url, weight }) => (
          <li key={weight}>
            <a
              className="bg-indigo-900 text-white p-4 rounded-full text-xl hover:shadow-md hover:-translate-y-1 transition-all block"
              href={url}
            >
              Download {selectedFont} {weight} ({style})
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
