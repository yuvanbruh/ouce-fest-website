// "use client"

// import { Canvas, useFrame } from "@react-three/fiber"
// import { OrbitControls, Stars, Sphere, Sparkles, useGLTF } from "@react-three/drei"
// import { EffectComposer, Bloom } from "@react-three/postprocessing"
// import { useRef } from "react"
// import * as THREE from "three"

// /* ===== PLANET ===== */
// function Planet() {
//   const ref = useRef<THREE.Mesh>(null)

//   useFrame(({ clock }) => {
//     if (ref.current) {
//       ref.current.rotation.y = clock.getElapsedTime() * 0.05
//     }
//   })

//   return (
//     <Sphere ref={ref} args={[1.6, 64, 64]} position={[2.2, -0.5, -2]}>
//       <meshStandardMaterial
//         color="#0a1f44"
//         emissive="#001a33"
//         emissiveIntensity={0.4}
//         roughness={0.9}
//         metalness={0.1}
//       />
//     </Sphere>
//   )
// }

// /* ===== REAL GLB ROCKET (HYBRID CONTROL) ===== */
// function Rocket() {
//   const ref = useRef<THREE.Group>(null)

//   const { scene } = useGLTF("/models/futuristic_spaceship.glb")

//   useFrame(({ clock }) => {
//     if (!ref.current) return

//     const t = clock.getElapsedTime()

//     // Only gentle floating now
//     ref.current.position.y = Math.sin(t * 0.4) * 0.15
//   })

//   return (
//     <group ref={ref} position={[0, -1, 0]} scale={1.2}>
//       <primitive object={scene} />

//       {/* Engine glow */}
//       <pointLight
//         position={[0, -2, 0]}
//         intensity={2.5}
//         color="#ff4400"
//         distance={10}
//       />

//       {/* Exhaust sparkle effect */}
//       <Sparkles
//         count={80}
//         scale={[2.5, 2.5, 2.5]}
//         size={3}
//         speed={1}
//         position={[0, -2, 0]}
//         color="#ff7700"
//       />
//     </group>
//   )
// }

// // Preload model for performance
// useGLTF.preload("/models/futuristic_spaceship.glb")

// /* ===== SMALL SATELLITE ===== */
// function Satellite() {
//   const ref = useRef<THREE.Group>(null)

//   useFrame(({ clock }) => {
//     if (!ref.current) return
//     ref.current.rotation.y = clock.getElapsedTime() * 0.4
//   })

//   return (
//     <group ref={ref} position={[2.2, 0.5, -2]}>
//       <mesh>
//         <boxGeometry args={[0.25, 0.25, 0.25]} />
//         <meshStandardMaterial color="#999999" />
//       </mesh>
//     </group>
//   )
// }

// /* ===== FINAL SCENE ===== */
// export function SpaceScene() {
//   return (
//     <div className="absolute inset-0">
//       <Canvas camera={{ position: [0, 1, 7] }} gl={{ alpha: false }}>

//         {/* PURE BLACK BACKGROUND */}
//         <color attach="background" args={["#000000"]} />

//         {/* LIGHTING */}
//         <ambientLight intensity={1.2} />
//         <directionalLight position={[10, 10, 10]} intensity={2} />

//         {/* CLEANER STAR FIELD (NO RED TINT) */}
//         <Stars
//           radius={160}
//           depth={80}
//           count={7000}
//           factor={4}
//           saturation={1}     // neutral white stars
//           fade
//         />

//         {/* MAIN ELEMENTS */}
//         <Planet />
//         <Rocket />
//         <Satellite />

//         {/* HYBRID CONTROLS – BEST UX */}
//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           autoRotate
//           autoRotateSpeed={1.2}
//         />

//         {/* SOFTER GLOW */}
//         <EffectComposer>
//           <Bloom
//             intensity={1.2}
//             luminanceThreshold={0.1}
//             luminanceSmoothing={0.6}
//           />
//         </EffectComposer>

//       </Canvas>
//     </div>
//   )
// }
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
function Planet({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <Sphere
      ref={ref}
      args={[isMobile ? 1 : 1.6, 64, 64]}
      position={isMobile ? [1.2, -0.3, -1] : [2.2, -0.5, -2]}
    >
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
function Rocket({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/models/futuristic_spaceship.glb")

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.y = Math.sin(t * 0.4) * 0.1
  })

  return (
    <group
      ref={ref}
      position={isMobile ? [0, -0.6, 0] : [0, -1, 0]}
      scale={isMobile ? 0.8 : 1.2}
    >
      <primitive object={scene} />

      <pointLight position={[0, -2, 0]} intensity={2.5} color="#ff4400" distance={10} />

      <Sparkles
        count={isMobile ? 40 : 80}
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
function Satellite({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.4
  })

  return (
    <group ref={ref} position={isMobile ? [1.3, 0.2, -1] : [2.2, 0.5, -2]}>
      <mesh>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
    </group>
  )
}

/* Adjust camera for mobile */
function ResponsiveCamera({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, isMobile ? 0.5 : 1, isMobile ? 5 : 7)
  }, [isMobile, camera])

  return null
}

/* ===== FINAL SCENE ===== */
export function SpaceScene() {
  const isMobile = useIsMobile()

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 1, 7] }} gl={{ alpha: false }}>

        <ResponsiveCamera isMobile={isMobile} />

        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 10]} intensity={2} />

        <Stars
          radius={160}
          depth={80}
          count={isMobile ? 3000 : 7000}
          factor={isMobile ? 2 : 4}
          saturation={1}
          fade
        />

        <Planet isMobile={isMobile} />
        <Rocket isMobile={isMobile} />
        <Satellite isMobile={isMobile} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={isMobile ? 0.6 : 1.2}
        />

        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.1} luminanceSmoothing={0.6} />
        </EffectComposer>

      </Canvas>
    </div>
  )
}
