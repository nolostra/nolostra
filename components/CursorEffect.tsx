'use client'

import { useEffect, useRef } from 'react'

interface BrickHeat {
  heat: number
  lastUpdate: number
  peakHeat: number
}

export default function CursorEffect() {
  const brickHeatsRef = useRef<Map<string, BrickHeat>>(new Map())
  const GRID_SIZE = 20 // Match the grid size from CSS
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    // Only enable on desktop (not mobile)
    if (window.innerWidth < 768) return

    let rafId: number | null = null

    const getBrickKey = (x: number, y: number): string => {
      const gridX = Math.floor(x / GRID_SIZE)
      const gridY = Math.floor(y / GRID_SIZE)
      return `${gridX},${gridY}`
    }

    const updateHeat = () => {
      const now = Date.now()
      const heats = brickHeatsRef.current
      let hasChanges = false

      // Reduce heat over time (cool down)
      heats.forEach((brick, key) => {
        const timeSinceUpdate = now - brick.lastUpdate
        const coolDownRate = 0.0006 // Heat reduces per ms
        const newHeat = Math.max(0, brick.heat - timeSinceUpdate * coolDownRate)

        if (newHeat !== brick.heat) {
          brick.heat = newHeat
          brick.lastUpdate = now
          hasChanges = true

          // Remove cooled bricks
          if (newHeat <= 0.01) {
            heats.delete(key)
          }
        }
      })

      // Update CSS custom properties for heat visualization
      if (hasChanges || heats.size > 0) {
        const heatGradients: string[] = []
        
        heats.forEach((brick, key) => {
          if (brick.heat > 0.01) {
            const [gridX, gridY] = key.split(',').map(Number)
            const x = gridX * GRID_SIZE + GRID_SIZE / 2
            const y = gridY * GRID_SIZE + GRID_SIZE / 2
            const heatIntensity = Math.min(1, brick.heat)
            
            // Enhanced blue heat effect with multiple layers for depth
            const opacity = heatIntensity * 0.5 // Max 50% opacity
            const innerSize = 15 + heatIntensity * 10 // 15px to 25px (hot core)
            const outerSize = 30 + heatIntensity * 20 // 30px to 50px (heat aura)
            
            // Core heat (brighter, smaller)
            const coreBlue = `rgba(31, 111, 235, ${opacity * 0.8})`
            // Outer heat (softer, larger)
            const outerBlue = `rgba(59, 130, 246, ${opacity * 0.3})`
            
            // Create layered heat effect
            heatGradients.push(
              `radial-gradient(circle ${outerSize}px at ${x}px ${y}px, ${outerBlue} 0%, transparent 60%)`,
              `radial-gradient(circle ${innerSize}px at ${x}px ${y}px, ${coreBlue} 0%, transparent 70%)`
            )
          }
        })

        // Apply all heat gradients as background
        const heatLayer = document.getElementById('brick-heat-layer')
        if (heatLayer) {
          heatLayer.style.backgroundImage = heatGradients.join(', ')
          heatLayer.style.opacity = '1'
        }
      } else {
        // Fade out when no heat
        const heatLayer = document.getElementById('brick-heat-layer')
        if (heatLayer) {
          heatLayer.style.opacity = '0'
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateHeat)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e
        const now = Date.now()

        // Get the brick under cursor and nearby bricks for heat spread
        const brickKey = getBrickKey(clientX, clientY)
        const heats = brickHeatsRef.current
        
        // Heat up the main brick
        const existing = heats.get(brickKey)
        const heatIncrease = 0.25 // Faster heat up
        const newHeat = Math.min(1.0, (existing?.heat || 0) + heatIncrease)

        heats.set(brickKey, {
          heat: newHeat,
          lastUpdate: now,
          peakHeat: Math.max(newHeat, existing?.peakHeat || 0),
        })

        // Heat up adjacent bricks (creates a spread effect)
        const [gridX, gridY] = brickKey.split(',').map(Number)
        const adjacentBricks = [
          `${gridX - 1},${gridY}`, // left
          `${gridX + 1},${gridY}`, // right
          `${gridX},${gridY - 1}`, // top
          `${gridX},${gridY + 1}`, // bottom
        ]

        adjacentBricks.forEach((adjKey) => {
          const adjBrick = heats.get(adjKey)
          if (adjBrick) {
            // Adjacent bricks get less heat (spread effect)
            const adjHeat = Math.min(1.0, adjBrick.heat + heatIncrease * 0.3)
            heats.set(adjKey, {
              heat: adjHeat,
              lastUpdate: now,
              peakHeat: Math.max(adjHeat, adjBrick.peakHeat),
            })
          } else {
            // Create new adjacent brick with lower heat
            heats.set(adjKey, {
              heat: heatIncrease * 0.2,
              lastUpdate: now,
              peakHeat: heatIncrease * 0.2,
            })
          }
        })

        // Calculate normalized position for grid opacity
        const { innerWidth, innerHeight } = window
        const x = clientX / innerWidth
        const y = clientY / innerHeight
        const centerX = 0.5
        const centerY = 0.5
        const distanceX = Math.abs(x - centerX)
        const distanceY = Math.abs(y - centerY)
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

        const baseOpacity = 0.15
        const maxIntensity = 0.12
        const intensity = (1 - distance * 1.5) * maxIntensity
        const gridOpacity = Math.max(baseOpacity, Math.min(baseOpacity + intensity, 0.3))

        document.documentElement.style.setProperty('--cursor-grid-opacity', `${gridOpacity}`)
        document.documentElement.style.setProperty('--cursor-glow-x', `${clientX}px`)
        document.documentElement.style.setProperty('--cursor-glow-y', `${clientY}px`)
      })
    }

    // Start heat reduction animation
    animationFrameRef.current = requestAnimationFrame(updateHeat)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      id="brick-heat-layer"
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: '',
        opacity: 0,
        transition: 'opacity 0.2s ease-out, background-image 0.15s ease-out',
      }}
    />
  )
}
