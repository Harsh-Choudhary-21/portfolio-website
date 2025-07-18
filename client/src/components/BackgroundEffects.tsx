import React, { useState, useEffect } from 'react'

// Dynamic Particles Component
export function DynamicParticles({ mousePosition, scrollProgress, currentSection }: {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
  currentSection: number;
}) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    color: string;
    opacity: number;
    direction: number;
  }>>([])

  useEffect(() => {
    const particleCount = 25
    const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b']
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.2,
      direction: Math.random() * Math.PI * 2
    }))
    
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + Math.cos(particle.direction) * particle.speed
        let newY = particle.y + Math.sin(particle.direction) * particle.speed
        
        // Mouse attraction
        const dx = mousePosition.x - newX
        const dy = mousePosition.y - newY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const attraction = 0.02
          newX += dx * attraction
          newY += dy * attraction
        }
        
        // Boundary wrapping
        if (newX < 0) newX = window.innerWidth
        if (newX > window.innerWidth) newX = 0
        if (newY < 0) newY = window.innerHeight
        if (newY > window.innerHeight) newY = 0
        
        return {
          ...particle,
          x: newX,
          y: newY,
          opacity: 0.2 + Math.sin(Date.now() * 0.001 + particle.id) * 0.3
        }
      }))
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [mousePosition])

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full transition-all duration-300"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            transform: `scale(${1 + scrollProgress * 0.5})`
          }}
        />
      ))}
    </>
  )
}

// Animated Background Gradients
export function AnimatedGradients({ currentSection, scrollProgress }: {
  currentSection: number;
  scrollProgress: number;
}) {
  const gradientColors = [
    'from-cyan-500/10 via-blue-500/5 to-purple-500/10',
    'from-purple-500/10 via-pink-500/5 to-cyan-500/10',
    'from-blue-500/10 via-cyan-500/5 to-green-500/10',
    'from-green-500/10 via-blue-500/5 to-purple-500/10',
    'from-pink-500/10 via-purple-500/5 to-blue-500/10',
    'from-orange-500/10 via-red-500/5 to-pink-500/10',
    'from-teal-500/10 via-cyan-500/5 to-blue-500/10'
  ]

  return (
    <div className="fixed inset-0 z-8 pointer-events-none">
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradientColors[currentSection]} transition-all duration-1000 animate-gradient-shift`}
        style={{
          opacity: 0.3 + scrollProgress * 0.2,
          transform: `scale(${1 + scrollProgress * 0.1}) rotate(${scrollProgress * 5}deg)`
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent animate-pulse"
        style={{
          animationDuration: '4s',
          opacity: 0.1 + Math.sin(Date.now() * 0.001) * 0.05
        }}
      />
    </div>
  )
}

// Floating Geometric Shapes
export function FloatingShapes({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const shapes = [
    { type: 'circle', size: 60, x: 10, y: 20, speed: 0.5, color: 'cyan' },
    { type: 'square', size: 40, x: 80, y: 15, speed: 0.3, color: 'purple' },
    { type: 'triangle', size: 50, x: 15, y: 70, speed: 0.4, color: 'blue' },
    { type: 'circle', size: 35, x: 85, y: 75, speed: 0.6, color: 'pink' },
    { type: 'square', size: 45, x: 50, y: 10, speed: 0.35, color: 'green' },
    { type: 'triangle', size: 55, x: 70, y: 60, speed: 0.45, color: 'orange' }
  ]

  return (
    <div className="fixed inset-0 z-12 pointer-events-none">
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={`absolute opacity-10 transition-all duration-1000 animate-float-slow`}
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${8 + index}s`,
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px) rotate(${Date.now() * 0.001 * shape.speed}rad)`
          }}
        >
          {shape.type === 'circle' && (
            <div 
              className={`w-full h-full rounded-full border-2 border-${shape.color}-400`}
              style={{
                background: `radial-gradient(circle, rgba(6, 182, 212, 0.1), transparent)`,
                boxShadow: `0 0 20px rgba(6, 182, 212, 0.2)`
              }}
            />
          )}
          {shape.type === 'square' && (
            <div 
              className={`w-full h-full border-2 border-${shape.color}-400 rotate-45`}
              style={{
                background: `linear-gradient(45deg, rgba(139, 92, 246, 0.1), transparent)`,
                boxShadow: `0 0 20px rgba(139, 92, 246, 0.2)`
              }}
            />
          )}
          {shape.type === 'triangle' && (
            <div 
              className="w-0 h-0"
              style={{
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid rgba(236, 72, 153, 0.1)`,
                filter: `drop-shadow(0 0 10px rgba(236, 72, 153, 0.3))`
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}