import React, { useState, useEffect, useRef } from 'react'
import { NavigationArrows, NavigationDots, SectionIndicator, ScrollProgress } from './components/Navigation'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { SkillsSection } from './sections/SkillsSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { CertificatesSection } from './sections/CertificatesSection'
import { AchievementsSection } from './sections/AchievementsSection'
import { ContactSection } from './sections/ContactSection'
import { DynamicParticles, AnimatedGradients, FloatingShapes } from './components/BackgroundEffects'

// Declare Vanta for TypeScript
declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]))
  const [currentSection, setCurrentSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)
  const animationFrameRef = useRef<number>()
  const particlesRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const sections = [
    'hero',
    'about',
    'skills',
    'experience',
    'projects',
    'certificates',
    'achievements',
    'contact'
  ]

  // Initialize Vanta.js background with enhanced settings
  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current && window.VANTA) {
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x06b6d4,
        backgroundColor: 0x0a0a0a,
        points: 15.00,
        maxDistance: 28.00,
        spacing: 16.00,
        showDots: true
      })
      
      // Enhanced Vanta settings with dynamic color changes
      const updateVantaColors = () => {
        if (vantaEffect.current) {
          const time = Date.now() * 0.001
          const hue = (Math.sin(time * 0.1) * 30 + 200) % 360
          const color = `hsl(${hue}, 70%, 60%)`
          // Convert HSL to hex for Vanta
          const hexColor = hslToHex(hue, 70, 60)
          vantaEffect.current.setOptions({
            color: hexColor,
            points: 12 + Math.sin(time * 0.2) * 3,
            maxDistance: 25 + Math.sin(time * 0.15) * 8
          })
        }
        animationFrameRef.current = requestAnimationFrame(updateVantaColors)
      }
      updateVantaColors()
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [])

  // HSL to Hex conversion helper
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return parseInt(`${f(0)}${f(8)}${f(4)}`, 16)
  }

  // Mouse tracking for enhanced effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      try {
        setMousePosition({ x: e.clientX, y: e.clientY })
        
        // Update Vanta mouse influence
        if (vantaEffect.current) {
          const intensity = Math.sqrt(e.movementX ** 2 + e.movementY ** 2) * 0.1
          vantaEffect.current.setOptions({
            mouseControls: true,
            touchControls: true,
            gyroControls: false
          })
        }
      } catch (error) {
        console.warn('Mouse move error:', error)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Enhanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const scrollTop = containerRef.current.scrollTop
      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight
      const progress = Math.min(scrollTop / scrollHeight, 1)
      setScrollProgress(progress)

      // Update Vanta based on scroll
      if (vantaEffect.current) {
        const scrollInfluence = progress * 0.3
        vantaEffect.current.setOptions({
          spacing: 16 + scrollInfluence * 8,
          points: 15 + scrollInfluence * 5
        })
      }

      // Determine current section based on scroll position
      const sectionHeight = containerRef.current.clientHeight
      const newCurrentSection = Math.min(
        Math.floor(scrollTop / sectionHeight),
        sections.length - 1
      )
      setCurrentSection(newCurrentSection)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [sections.length])

  // Intersection Observer for scroll animations with improved settings
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0')
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, sectionIndex]))
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '-5% 0px -5% 0px',
        root: containerRef.current
      }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Smooth scroll to section with improved behavior
  const scrollToSection = (index: number) => {
    const container = containerRef.current
    const section = sectionRefs.current[index]
    if (container && section) {
      const sectionTop = section.offsetTop
      container.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {/* Enhanced Vanta.js Background */}
      <div 
        ref={vantaRef} 
        className="fixed inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Dynamic Particle System */}
      <div ref={particlesRef} className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
        <DynamicParticles mousePosition={mousePosition} scrollProgress={scrollProgress} currentSection={currentSection} />
      </div>

      {/* Enhanced overlay with gradient effects */}
      <div className="fixed inset-0 z-5 bg-gradient-to-br from-black/50 via-black/30 to-black/60 pointer-events-none" />
      <div className="fixed inset-0 z-6 bg-gradient-to-t from-black/70 via-transparent to-black/50 md:from-black/70 md:via-transparent md:to-black/50 from-black/85 via-black/60 to-black/75 pointer-events-none" />
      
      {/* Additional mobile dimming overlay */}
      <div className="fixed inset-0 z-7 bg-black/40 md:bg-transparent pointer-events-none" />

      {/* Enhanced cursor glow effect */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-10 opacity-30 transition-all duration-500 hidden md:block animate-pulse"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: `radial-gradient(circle, rgba(6, 182, 212, ${0.4 + Math.sin(Date.now() * 0.003) * 0.2}) 0%, rgba(139, 92, 246, ${0.2 + Math.sin(Date.now() * 0.002) * 0.1}) 50%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Animated Background Gradients */}
      <AnimatedGradients currentSection={currentSection} scrollProgress={scrollProgress} />

      {/* Floating Geometric Shapes */}
      <FloatingShapes mousePosition={mousePosition} />

      {/* Navigation Components */}
      <NavigationDots 
        currentSection={currentSection}
        sections={sections}
        onNavigate={scrollToSection}
      />
      
      <SectionIndicator 
        currentSection={currentSection}
        sections={sections}
      />

      <ScrollProgress progress={scrollProgress} />

      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className="h-full w-full overflow-y-auto overflow-x-hidden relative z-20 scroll-smooth scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Hero Section */}
        <div 
          ref={el => sectionRefs.current[0] = el}
          data-section="0"
          className={`min-h-screen transition-all duration-700 ease-out ${
            visibleSections.has(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <HeroSection />
        </div>

        {/* About Section */}
        <div 
          ref={el => sectionRefs.current[1] = el}
          data-section="1"
          className={`min-h-screen transition-all duration-700 ease-out delay-100 ${
            visibleSections.has(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <AboutSection />
        </div>
        
        {/* Skills Section */}
        <div 
          ref={el => sectionRefs.current[2] = el}
          data-section="2"
          className={`min-h-screen flex items-start justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-200 overflow-hidden ${
            visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className={`transition-all duration-600 ease-out delay-300 ${
            visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <SkillsSection />
          </div>
        </div>

        {/* Experience Section */}
        <div 
          ref={el => sectionRefs.current[3] = el}
          data-section="3"
          className={`min-h-screen flex items-start justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-300 overflow-hidden ${
            visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className={`transition-all duration-600 ease-out delay-400 ${
            visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <ExperienceSection />
          </div>
        </div>

        {/* Projects Section */}
        <div 
          ref={el => sectionRefs.current[4] = el}
          data-section="4"
          className={`min-h-screen flex items-start justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-400 overflow-hidden ${
            visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className={`transition-all duration-600 ease-out delay-500 ${
            visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <ProjectsSection />
          </div>
        </div>

        {/* Certificates Section */}
        <div 
          ref={el => sectionRefs.current[5] = el}
          data-section="5"
          className={`min-h-screen flex items-start justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-500 overflow-hidden ${
            visibleSections.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className={`transition-all duration-600 ease-out delay-600 ${
            visibleSections.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <CertificatesSection />
          </div>
        </div>

        {/* Achievements Section */}
        <div 
          ref={el => sectionRefs.current[6] = el}
          data-section="6"
          className={`min-h-screen flex items-start justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-500 overflow-hidden ${
            visibleSections.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className={`transition-all duration-600 ease-out delay-700 ${
            visibleSections.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <AchievementsSection />
          </div>
        </div>

        {/* Contact Section */}
        <div 
          ref={el => sectionRefs.current[7] = el}
          data-section="7"
          className={`min-h-screen flex items-center justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-600 overflow-hidden ${
            visibleSections.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className={`transition-all duration-600 ease-out delay-700 ${
            visibleSections.has(7) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App