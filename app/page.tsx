'use client'

import Overlay from '@/components/overlay'
import Scene from '@/components/scene'

export default function Home() {
  return (
    <main className="flex w-screen h-screen bg-gradient-radial">
      <Scene />
      <Overlay />
    </main>
  )
}
