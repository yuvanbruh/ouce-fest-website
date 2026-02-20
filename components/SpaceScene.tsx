"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars, Sphere, Sparkles, useGLTF } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

/* Detect Mobile */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return isMobile
}

/* ===== PLANET ===== */
function Planet() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <Sphere ref={ref} args={[1.6, 64, 64]} position={[2.2, -0.5, -2]}>
      <meshStandardMaterial
        color="#0a1f44"
        emissive="#001a33"
        emissiveIntensity={0.4}
        roughness={0.9}
        metalness={0.1}
      />
    </Sphere>
  )
}

/* ===== REAL GLB ROCKET ===== */
function Rocket() {
  const ref = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/models/futuristic_spaceship.glb")

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.y = Math.sin(t * 0.4) * 0.1
  })

  return (
      <group ref={ref} position={[0, -1, 0]} scale={1.2}>
      <primitive object={scene} />

      <pointLight position={[0, -2, 0]} intensity={2.5} color="#ff4400" distance={10} />

      <Sparkles
        count={50}
        scale={[2.5, 2.5, 2.5]}
        size={2}
        speed={1}
        position={[0, -2, 0]}
        color="#ff7700"
      />
    </group>
  )
}

useGLTF.preload("/models/futuristic_spaceship.glb")

/* ===== SATELLITE ===== */
function Satellite() {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.4
  })

  return (
    <group ref={ref} position={[2.2, 0.5, -2]}>
      <mesh>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
    </group>
  )
}

/* Camera setup */
function CameraSetup() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 1, 7)
  }, [camera])

  return null
}

/* ===== FINAL SCENE ===== */
export function SpaceScene() {
  const isMobile = useIsMobile()

  // COMPLETELY DISABLE 3D ON MOBILE
  if (isMobile) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#020817] to-black" />
    )
  }

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 1, 7] }} gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }} dpr={[1, 1.5]}>

        <CameraSetup />

        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={2} />

        <Stars radius={160} depth={80} count={2000} factor={4} saturation={1} fade />

        <Planet />
        <Rocket />
        <Satellite />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
        />

        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.6} />
        </EffectComposer>

      </Canvas>
    </div>
  )
}
