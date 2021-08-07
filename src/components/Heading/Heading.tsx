import React from 'react'

export function Heading() {
  return (
    <section className="px-24 mt-16 text-center">
      <h1 className="text-2xl">Fontset</h1>
      <h2 className="max-w-screen-md mx-auto mt-8 text-6xl leading-tight">
        Generate a tiny Google font to self-host.
      </h2>
      <a
        className="inline-block mt-8 text-2xl italic text-green-100 underline"
        href="https://joyofcode.xyz/using-fonts-on-the-web"
        target="_blank"
      >
        Why?
      </a>
    </section>
  )
}
