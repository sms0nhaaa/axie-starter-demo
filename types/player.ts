import { Animation } from './axie-starter'

export type Player = {
  position: {
    x: number
    y: number
    z: number
  }
  quaternion: {
    x: number
    y: number
    z: number
    w: number
  }
  username: string
  animation: Animation
  id: string
  title: string
  axie: string
}

export type Players = {
  id: Player
}
