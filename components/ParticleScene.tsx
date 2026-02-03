"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Stars } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function Galaxy() {
  const ref = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const [positions, colors] = useMemo(() => {
    const positions = []
    const colors = []

    const count = 6000

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 1.8 + Math.random() * 3.5

      const x = Math.cos(angle) * radius
      const y = (Math.random() - 0.5) * 1.5
      const z = Math.sin(angle) * radius

      positions.push(x, y, z)

      // Dual color theme: gold + cyan
      const mix = Math.random()

      if (mix > 0.5) {
        colors.push(0.0, 1.0, 1.0) // cyan
      } else {
        colors.push(1.0, 0.8, 0.2) // gold
      }
    }

    return [new Float32Array(positions), new Float32Array(colors)]
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return

    const t = clock.getElapsedTime()

    ref.current.rotation.y = t * 0.12 + mouse.x * 0.5
    ref.current.rotation.x = t * 0.06 + mouse.y * 0.3
  })

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        vertexColors
        size={0.025}
        sizeAttenuation
        transparent
        depthWrite={false}
      />
    </Points>
  )
}

function FloatingDust() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const temp = []
    for (let i = 0; i < 1500; i++) {
      temp.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
    }
    return new Float32Array(temp)
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        color="#ffffff"
        size={0.015}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </Points>
  )
}

export function ParticleScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={["black"]} />

        <ambientLight intensity={0.5} />

        {/* Background Stars */}
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <Galaxy />
        <FloatingDust />

        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
