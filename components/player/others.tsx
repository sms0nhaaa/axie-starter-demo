import { Buba, Pomodoro, Puffy } from '@sms0nhaaa/r3f-axie-starter'
import { Player, Players } from '@/types/player'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group, Quaternion, Vector3 } from 'three'

type PlayerProps = {
  players: Players | undefined
  mainPlayerId: string | undefined
}

const nextPosition = new Vector3()
const nextQuaternion = new Quaternion()

export default function OtherPlayers(props: PlayerProps) {
  return (
    <>
      {props.players &&
        Object.values(props.players).map((player) => (
          <>{player.id !== props.mainPlayerId && <Other player={player} key={player.id} />}</>
        ))}
    </>
  )
}

function Other({ player }: { player: Player }) {
  const playerRef = useRef<Group>(null)

  useFrame(() => {
    if (!player.position) return

    if (playerRef.current) {
      nextPosition.fromArray([player.position.x, player.position.y, player.position.z])
      nextQuaternion.fromArray([player.quaternion.x, player.quaternion.y, player.quaternion.z, player.quaternion.w])
      playerRef.current.position.lerp(nextPosition, 0.3)
      playerRef.current.quaternion.rotateTowards(nextQuaternion, 0.4)
    }
  })

  return (
    <group ref={playerRef}>
      {
        {
          buba: <Buba animation={player.animation} outline={{ thickness: 0.03, opacity: 1, color: 'black' }} />,
          puffy: <Puffy animation={player.animation} outline={{ thickness: 0.03, opacity: 1, color: 'black' }} />,
          pomodoro: <Pomodoro animation={player.animation} outline={{ thickness: 0.03, opacity: 1, color: 'black' }} />,
        }[player.axie]
      }
      <Html position={[0, 2, 0]} center>
        <div className="px-3 pb-2 pt-1 rounded-lg bg-base-200 select-none flex flex-col items-center gap-1">
          <span className="text-center text-primary-content">{player.id}</span>
        </div>
      </Html>
    </group>
  )
}
