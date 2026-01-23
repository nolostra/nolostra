'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Torus } from '@react-three/drei'
import * as THREE from 'three'

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={[-3, 0, 0]}>
      <meshStandardMaterial color="#00D9FF" metalness={0.8} roughness={0.2} />
    </Box>
  )
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 2
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.5) * 2
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.8, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial color="#A855F7" metalness={0.8} roughness={0.2} />
    </Sphere>
  )
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.z += 0.02
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <Torus ref={meshRef} args={[0.6, 0.3, 16, 100]} position={[3, 0, 0]}>
      <meshStandardMaterial color="#00D9FF" metalness={0.8} roughness={0.2} />
    </Torus>
  )
}

export default function Interactive3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#A855F7" />
      
      <FloatingCube />
      <FloatingSphere />
      <FloatingTorus />
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={5}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}

