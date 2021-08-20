import React, { useEffect } from 'react'
import { highlightAll } from 'prismjs'

interface CodeProps {
  code: string
  language: string
}

export function Code({ code, language }: CodeProps) {
  useEffect(() => highlightAll(), [code])

  return (
    <pre className="scrollbar">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}
