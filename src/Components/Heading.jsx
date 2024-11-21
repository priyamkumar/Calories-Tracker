import React from 'react'

export default function Heading({text, className}) {
  return (
    <h2 className={`${className}-heading`}>{text}</h2>
  )
}
