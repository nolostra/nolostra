'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TrajectorPoint {
  x: number
  y: number
  z: number
  section: string
}

// Define Trajector path points - creates a smooth orbital path
// Scaled to be subtle and elegant, not overwhelming
const TrajectorPoints: TrajectorPoint[] = [
  { x: 0, y: 0, z: 0, section: 'hero' },           // Origin
  { x: 1.5, y: 0.8, z: -0.8, section: 'about' },   // First curve
  { x: 2.5, y: 1.5, z: -1.5, section: 'projects' }, // Acceleration
  { x: 2, y: 2.5, z: -1, section: 'experience' },   // Vertical lift
  { x: 0.8, y: 3.2, z: 0, section: 'showcase' },    // Convergence
  { x: 0, y: 3.8, z: 0.5, section: 'contact' },     // Final point
]

function TrajectorLine({ progress, mousePosition }: { progress: number; mousePosition: THREE.Vector2 }) {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      TrajectorPoints.map(p => new THREE.Vector3(p.x, p.y, p.z)),
      false,
      'catmullrom',
      0.5
    )
  }, [])

  const points = useMemo(() => curve.getPoints(300), [curve]) // More points for smoother curve
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  const particlesRef = useRef<THREE.Points>(null)
  const lineRef = useRef<THREE.Line>(null)

  // Create particles - subtle flow along Trajector
  const particleCount = 30
  const particlePositions = useMemo(() => {
    return new Float32Array(particleCount * 3)
  }, [])

  const particleGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    return geom
  }, [particlePositions])

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const t = ((i / particleCount) + time * 0.1 + progress) % 1
        const point = curve.getPoint(t)
        positions[i * 3] = point.x
        positions[i * 3 + 1] = point.y
        positions[i * 3 + 2] = point.z
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Update line opacity based on progress
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.4 + progress * 0.6
    }
  })

  return (
    <group>
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial 
          color={0x00d9ff} 
          transparent 
          opacity={0.3 + progress * 0.5}
          linewidth={1.5}
        />
      </line>
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          color={0xa855f7}
          size={0.06}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

function TrajectorNode({ point, index, progress, isActive }: { 
  point: TrajectorPoint
  index: number
  progress: number
  isActive: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const isVisible = progress >= (index / TrajectorPoints.length) - 0.1

  useFrame((state) => {
    if (meshRef.current && isVisible) {
      const time = state.clock.elapsedTime
      const baseScale = isActive ? 1.5 : 1
      const pulse = Math.sin(time * 2 + index) * 0.1
      meshRef.current.scale.setScalar(baseScale + pulse)
      
      if (isActive) {
        const activePulse = Math.sin(time * 3) * 0.3
        meshRef.current.scale.setScalar(1.5 + activePulse)
      }
    }
  })

  if (!isVisible) return null

  return (
    <mesh
      ref={meshRef}
      position={[point.x, point.y, point.z]}
    >
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={isActive ? 0x00d9ff : 0xa855f7}
        emissive={isActive ? 0x00d9ff : 0xa855f7}
        emissiveIntensity={isActive ? 1.5 : 0.4}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

export default function TrajectorCanvas({ 
  scrollProgress, 
  activeSection,
  mousePosition 
}: { 
  scrollProgress: number
  activeSection: string
  mousePosition: THREE.Vector2
}) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 3, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color={0x00d9ff} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color={0xa855f7} />
        
        <TrajectorLine progress={scrollProgress} mousePosition={mousePosition} />
        
        {TrajectorPoints.map((point, index) => (
          <TrajectorNode
            key={point.section}
            point={point}
            index={index}
            progress={scrollProgress}
            isActive={activeSection === point.section}
          />
        ))}
      </Canvas>
    </div>
  )
}
