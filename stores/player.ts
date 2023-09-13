import { Players } from '@/types/player'
import { create } from 'zustand'

type PlayerState = {
  mainPlayerId: string
  setMainPlayerId: (mainPlayerId: string) => void

  axie: string
  setAxie: (axie: string) => void

  players: Players | undefined
  setPlayers: (players: Players) => void
}

const usePlayerStore = create<PlayerState>()((set) => ({
  mainPlayerId: '',
  setMainPlayerId: (mainPlayerId: string) => set({ mainPlayerId }),

  axie: 'buba',
  setAxie: (axie: string) => set({ axie }),

  players: undefined,
  setPlayers: (players: Players) => set({ players }),
}))

export default usePlayerStore
