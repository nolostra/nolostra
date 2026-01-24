'use client'

import { Suspense, useEffect, useState, ErrorInfo, Component, ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Loader } from '@react-three/drei'

// Model path - try with basePath first
// In Next.js dev, public files might be served from root, so we'll handle both
const MODEL_PATH = '/nolostra/models/porsche.glb'

// Error Boundary for 3D model
class ModelErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError: () => void }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Silently handle error - model not available
    this.props.onError()
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

// Model component that loads the GLB file
function PorscheModel({ onError }: { onError: () => void }) {
  const { scene } = useGLTF(MODEL_PATH)
  
  // Scale and position the model appropriately
  useEffect(() => {
    if (scene) {
      scene.scale.set(1.5, 1.5, 1.5) // Make it larger
      scene.position.set(0, -1.2, 0)
      // Rotate to face right (side/profile view)
      scene.rotation.y = Math.PI / 2 // 90 degrees rotation to face right
      // Enable shadows if available
      scene.traverse((child) => {
        if ('isMesh' in child && child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
    }
  }, [scene])

  return <primitive object={scene} />
}

export default function Porsche3D() {
  const [modelError, setModelError] = useState(false)
  const SKETCHFAB_MODEL_ID = '8568d9d14a994b9cae59499f0dbed21e'
  const SKETCHFAB_EMBED_URL = `https://sketchfab.com/models/${SKETCHFAB_MODEL_ID}/embed`

  // Check if model file exists before trying to load
  // Suppress errors to avoid console noise
  useEffect(() => {
    const checkModel = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout
        
        const response = await fetch(MODEL_PATH, { 
          method: 'HEAD',
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          setModelError(true)
        }
      } catch (error) {
        // Silently fail - model not available, will use Sketchfab embed
        setModelError(true)
      }
    }
    
    checkModel()
  }, [])

  // Fallback to Sketchfab embed if local model is not available
  if (modelError) {
    return (
      <div className="w-full max-w-[90vw] sm:max-w-full mx-auto h-[120px] sm:h-[180px] md:h-[250px] lg:h-[500px] overflow-hidden relative">
        <iframe
          title="1975 Porsche 911 (930) Turbo"
          src={`${SKETCHFAB_EMBED_URL}?autostart=0&camera=0&ui_theme=dark&transparent=1`}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          className="w-full h-full border-0"
          style={{ background: 'transparent' }}
        />
        <p className="text-xs text-text-secondary mt-2 text-center px-4">
          3D Model by{' '}
          <a
            href="https://sketchfab.com/LionsharpStudios"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Lionsharp Studios
          </a>
          {' '}•{' '}
          <a
            href={`https://sketchfab.com/3d-models/free-1975-porsche-911-930-turbo-${SKETCHFAB_MODEL_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            View on Sketchfab
          </a>
          {' '}• CC Attribution
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[90vw] sm:max-w-full mx-auto h-[120px] sm:h-[180px] md:h-[250px] lg:h-[500px] overflow-hidden relative">
      <ModelErrorBoundary onError={() => setModelError(true)}>
        <Canvas
          camera={{ position: [0, 1.5, 7], fov: 55 }} // Side/profile view, more zoomed out
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]} // Device pixel ratio for better performance
          style={{ background: 'transparent', width: '100%', height: '100%', maxWidth: '100%' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            <PorscheModel onError={() => setModelError(true)} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableRotate={true}
              minDistance={5}
              maxDistance={12}
              autoRotate={true} // Enable auto-rotate
              autoRotateSpeed={0.5} // Rotation speed
              target={[0, -0.5, 0]} // Focus point slightly above ground
            />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
        
        {/* Loading indicator */}
        <Loader />
        
        <p className="text-xs text-text-secondary mt-2 text-center px-4">
          3D Model by{' '}
          <a
            href="https://sketchfab.com/LionsharpStudios"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Lionsharp Studios
          </a>
          {' '}• CC Attribution
        </p>
      </ModelErrorBoundary>
    </div>
  )
}
