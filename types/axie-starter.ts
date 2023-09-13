import { ReactThreeFiber } from '@react-three/fiber'

export const ANIMATIONS = [
  'idle',
  'idleattack',
  'idlecarryitem',
  'idlegethit',
  'cuttree',
  'jump',
  'run',
  'runattack',
  'runcarryitem',
  'rungethit',
  'runjump',
  'walk',
  'walkattack',
  'walkcarryitem',
  'walkjump',
] as const

export type Animation = (typeof ANIMATIONS)[number]

export type OutlinesProps = {
  color: ReactThreeFiber.Color
  opacity: number
  thickness: number
}

export interface AxieStarterProps {
  animation?: Animation
  timeScale?: number
  outline?: OutlinesProps
}
