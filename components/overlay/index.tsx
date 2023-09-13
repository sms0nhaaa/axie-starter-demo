import { useEffect, useMemo } from 'react'
import Chat from './chat'
import MaterialIntersect from './material-intersect'
import Me from './me'
import Recipe from './recipe'
import Ranking from './ranking'
import Settings from './settings'

export default function Overlay() {
  const trackId = 'XPRd0jb'
  const audio = useMemo(() => new Audio(`https://audius-discovery-4.theblueprint.xyz/v1/tracks/${trackId}/stream`), [])

  const play = () => {
    if (audio.played) {
      audio.loop = true
      audio.play()
    }
  }

  useEffect(() => {
    play()
  }, [])

  return (
    <div className="w-screen h-screen absolute inset-0 z-10" onClick={play}>
      <Me />
      <Chat />
      <Ranking />
      <Recipe />

      <Settings />

      <MaterialIntersect />
    </div>
  )
}
