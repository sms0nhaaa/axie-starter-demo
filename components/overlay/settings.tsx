import { database } from '@/services/firebase'
import usePlayerStore from '@/stores/player'
import { ref, update } from 'firebase/database'
import Image from 'next/image'

export default function Settings() {
  const [mainPlayerId, setAxie] = usePlayerStore((s) => [s.mainPlayerId, s.setAxie])

  const changeAxie = (axie: string) => {
    setAxie(axie)
    update(ref(database, `players/${mainPlayerId}`), {
      axie,
    })
  }

  return (
    <div className="absolute flex flex-col gap-2 bottom-6 right-6">
      <button
        className=" btn btn-square btn-md text-lg hover:cursor-c-pointer active:cursor-c-pointer-clicked"
        onClick={() => changeAxie('buba')}
      >
        <Image
          src={'https://welcome.axie.tech/images/accents/axies/buba-right.png'}
          width={40}
          height={40}
          alt="buba"
        />
      </button>

      <button
        className=" btn btn-square btn-md text-lg hover:cursor-c-pointer active:cursor-c-pointer-clicked"
        onClick={() => changeAxie('puffy')}
      >
        <Image
          src={'https://welcome.axie.tech/images/accents/axies/puffy-right.png'}
          width={40}
          height={40}
          alt="puffy"
        />
      </button>

      <button
        className=" btn btn-square btn-md text-lg hover:cursor-c-pointer active:cursor-c-pointer-clicked"
        onClick={() => changeAxie('pomodoro')}
      >
        <Image src={'https://pbs.twimg.com/media/FcmIqbnWQAEBagu.png'} width={40} height={40} alt="pomodoro" />
      </button>
    </div>
  )
}
