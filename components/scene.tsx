import { auth, database } from '@/services/firebase'
import usePlayerStore from '@/stores/player'
import { PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { signInAnonymously } from 'firebase/auth'
import { onValue, ref, remove, set } from 'firebase/database'
import { Suspense, useEffect, useState } from 'react'
import { MapPhysic } from './map-physic'
import Materials from './materials'
import MainPlayerPhysic from './player/main-physic'
import OtherPlayers from './player/others'
import RecipeManager from './recipe-manager'

export default function Scene() {
  const [players, mainPlayerId, setPlayers, setMainPlayerId] = usePlayerStore((state) => [
    state.players,
    state.mainPlayerId,
    state.setPlayers,
    state.setMainPlayerId,
  ])
  const [materials, setMaterials] = useState()

  useEffect(() => {
    const login = async () => {
      const { user } = await signInAnonymously(auth)

      setMainPlayerId(user.uid)
      set(ref(database, `players/${user.uid}`), {
        position: {
          x: 3,
          y: 0,
          z: 3,
        },
        quaternion: {
          x: 0,
          y: 0,
          z: 0,
          w: 0,
        },
        animation: 'idle',
        axie: 'buba',
        id: user.uid,
      })
    }

    login()
  }, [])

  useEffect(() => {
    onValue(ref(database, 'players'), (snapshot) => {
      setPlayers(snapshot.val())
    })

    onValue(ref(database, 'materials'), (snapshot) => {
      setMaterials(snapshot.val())
    })

    window.addEventListener('beforeunload', () => {
      remove(ref(database, `players/${mainPlayerId}`))
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-emerald-300 from-10% to-emerald-500 to-90% ">
      <Canvas>
        <ambientLight intensity={2} />
        <PerspectiveCamera makeDefault position={[0, 5, 10]} castShadow />
        <Suspense>
          <Physics gravity={[0, -9.82, 0]}>
            <Materials materials={materials} />
            <MainPlayerPhysic id={mainPlayerId} />
            <MapPhysic position={[0, -1, 0]} />
          </Physics>
        </Suspense>
        <OtherPlayers players={players} mainPlayerId={mainPlayerId} />
      </Canvas>

      <RecipeManager materials={materials} />
    </div>
  )
}

useGLTF.preload('/raw/starter_buba.glb')
useGLTF.preload('/raw/starter_puffy.glb')
useGLTF.preload('/raw/starter_pomodoro.glb')
