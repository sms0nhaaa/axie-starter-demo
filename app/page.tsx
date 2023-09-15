'use client'

import dynamic from 'next/dynamic'

const SceneNoSSR = dynamic(() => import('@/components/scene'), { ssr: false })
const OverlayNoSSR = dynamic(() => import('@/components/overlay'), { ssr: false })

export default function Home() {
  return (
    <main className="flex w-screen h-screen bg-gradient-radial cursor-c-auto active:cursor-c-auto-clicked">
      <SceneNoSSR />
      <OverlayNoSSR />
    </main>
  )
}
