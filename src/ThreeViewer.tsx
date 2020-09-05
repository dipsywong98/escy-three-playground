import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
// import { System, World } from 'ecsy'

export const ThreeViewer = () => {
  const root = useRef<HTMLDivElement>(null)
  const [{ renderer, camera }, set3] = useState<{ renderer?: THREE.Renderer, camera?: THREE.PerspectiveCamera }>({})
  // const [system, setSystem] = useState<World|null>(null)
  const resize = useCallback((): void => {
    const div = root.current
    if (div !== null && renderer !== undefined && camera !== undefined) {
      camera.aspect = div.clientWidth / div.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(div.clientWidth, div.clientHeight)
    }
  }, [camera, renderer])
  useEffect(() => {
    if (root.current !== null && renderer === undefined) {
      const div = root.current
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, div.clientWidth / div.clientHeight, 0.1, 1000)

      const renderer = new THREE.WebGLRenderer()
      set3({ renderer, camera })
      div.appendChild(renderer.domElement)
      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      camera.position.z = 5

      const animate = (): void => {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
      }
      animate()
    }
  }, [renderer])
  useEffect(() => {
    const div = root.current
    if (renderer !== undefined && div !== null) {
      window.addEventListener('resize', resize)
      resize()
      return () => {
        window.removeEventListener('resize', resize)
      }
    }
  }, [renderer, resize, camera])
  return <div ref={root} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}/>
}
