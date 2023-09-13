import usePlayerStore from '@/stores/player'
import { formatAddress } from '@/utils'
import Image from 'next/image'

export default function Me() {
  const [mainPlayerId, axie] = usePlayerStore((s) => [s.mainPlayerId, s.axie])

  return (
    <div className="absolute top-6 left-6 bg-base-300 p-3 rounded-2xl flex gap-2 pr-3.5 select-none">
      <div className="w-16 rounded-md overflow-hidden">
        {
          {
            buba: (
              <Image
                src={'https://welcome.axie.tech/images/accents/axies/buba-right.png'}
                className="w-full h-full object-cover"
                width={60}
                height={60}
                alt="buba"
              />
            ),
            puffy: (
              <Image
                src={'https://welcome.axie.tech/images/accents/axies/puffy-right.png'}
                className="w-full h-full object-cover"
                width={60}
                height={60}
                alt="puffy"
              />
            ),
            pomodoro: (
              <Image
                src={'https://pbs.twimg.com/media/FcmIqbnWQAEBagu.png'}
                className="w-full h-full object-cover"
                width={60}
                height={60}
                alt="pomodoro"
              />
            ),
          }[axie]
        }
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2  -mt-1 items-center">
          <span className="font-bold text-primary-content">{formatAddress(mainPlayerId)}</span>
        </div>
        {/* <span className="text-sm text-primary-content/60">{formatAddress(publicKey.toString())}</span> */}
        {/* {title && <div className="badge badge-accent badge-sm mt-2 font-medium">{title}</div>} */}
      </div>
    </div>
  )
}
