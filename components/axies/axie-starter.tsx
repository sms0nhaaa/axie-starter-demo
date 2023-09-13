import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'
import ANIMATIONS_DATA from './animations.json'

interface AxieStarterProps {
  name: string
  animation: string
  timeScale: number
}

export default function AxieStarter(props: JSX.IntrinsicElements['group'] & AxieStarterProps) {
  // const texture = useTexture(`./textures/${props.name}_texture.jpg`)
  const texture = useTexture(`./textures/buba_texture.png`)

  // const { scene, animations } = useGLTF(`/raw/starter_${props.name}.glb`)
  const { scene, animations } = useGLTF(`/raw/buba.glb`)
  const model = useMemo(() => SkeletonUtils.clone(scene), [scene])

  const mixer = new THREE.AnimationMixer(model)
  const animationData = useMemo(() => (ANIMATIONS_DATA as any)[props.name][props.animation], [props])

  useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.x = -1
    texture.center = new THREE.Vector2(0.5, 0.5)
    texture.rotation = Math.PI
    texture.flipY = false

    const clip = THREE.AnimationClip.parse(animationData)
    const action = new THREE.AnimationAction(mixer, clip, model)
    const material = new THREE.MeshStandardMaterial({ map: texture, transparent: true, toneMapped: false })
    material.needsUpdate = true

    action.reset().fadeIn(0.2).play()

    model.traverse((o: any) => {
      if (o.isMesh) {
        o.material = material
        o.castShadow = true
        o.receiveShadow = true
      }
    })

    return () => {
      action.fadeOut(0.2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    mixer.timeScale = props.timeScale
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.timeScale])

  useFrame((state, delta) => {
    mixer.update(delta)
  })

  return (
    <group {...props} dispose={null}>
      <primitive object={model} />
    </group>
  )
}
