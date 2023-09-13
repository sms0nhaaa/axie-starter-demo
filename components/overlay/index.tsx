'use client'

import { useEffect, useMemo } from 'react'
import Chat from './chat'
import MaterialIntersect from './material-intersect'
import Me from './me'
import Recipe from './recipe'
import Ranking from './ranking'
import Settings from './settings'

export default function Overlay() {
  return (
    <div className="w-screen h-screen absolute inset-0 z-10">
      <Me />
      <Chat />
      <Ranking />
      <Recipe />

      <Settings />

      <MaterialIntersect />
    </div>
  )
}
