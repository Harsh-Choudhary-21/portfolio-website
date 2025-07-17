import React, { useState, useEffect, useRef } from 'react'
import { NavigationArrows, NavigationDots, SectionIndicator, ScrollProgress } from './components/Navigation'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { Code2, GraduationCap, Briefcase, Award, Mail } from 'lucide-react'
import { SectionHeader, GlassCard } from './components/UI'
import { FlipSkillCategory } from './components/SkillsComponents'
import { TimelineItem } from './components/ExperienceComponents'
import { ProjectCard, CertificationCard, AchievementCard } from './components/ProjectsComponents'
import { ContactDetail, LanguageItem, SocialButton } from './components/ContactComponents'
import { Github, Linkedin, Code2 as CodeIcon, Trophy, MapPin, Phone, Coffee } from 'lucide-react'

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
          className={`min-h-screen flex items-start justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-200 ${
            visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-7xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <div className={`transition-all duration-600 ease-out delay-300 ${
              visibleSections.has(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <SectionHeader icon={<Code2 size={32} className="md:w-12 md:h-12" />} title="Skills & Expertise" subtitle="Technologies I work with" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 px-2 md:px-4">
              <div className={`transition-all duration-600 ease-out delay-400 ${
                visibleSections.has(2) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`}>
                <FlipSkillCategory 
                  title="Technical Arsenal" 
                  skills={[
                    { name: 'Python', level: 90, icon: '🐍', description: 'Advanced programming with frameworks like Django, Flask, and data science libraries' },
                    { name: 'C++', level: 85, icon: '⚡', description: 'Competitive programming and system-level development' },
                    { name: 'React.js', level: 80, icon: '⚛️', description: 'Modern frontend development with hooks and state management' },
                    { name: 'Node.js', level: 75, icon: '🟢', description: 'Backend development and API creation' },
                    { name: 'MySQL', level: 80, icon: '🗄️', description: 'Database design, optimization, and complex queries' },
                    { name: 'Machine Learning', level: 70, icon: '🤖', description: 'ML algorithms, data preprocessing, and model deployment' }
                  ]}
                  color="cyan"
                />
              </div>
              <div className={`transition-all duration-600 ease-out delay-500 ${
                visibleSections.has(2) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
              }`}>
                <FlipSkillCategory 
                  title="Professional Skills" 
                  skills={[
                    { name: 'Team Leadership', level: 85, icon: '👥', description: 'Leading tech teams and managing cross-functional projects' },
                    { name: 'Problem Solving', level: 90, icon: '🧩', description: 'Analytical thinking and creative solution development' },
                    { name: 'Communication', level: 80, icon: '💬', description: 'Technical writing, presentations, and stakeholder management' },
                    { name: 'Project Management', level: 75, icon: '📊', description: 'Agile methodologies and timeline management' },
                    { name: 'Time Management', level: 85, icon: '⏰', description: 'Prioritization and efficient workflow optimization' },
                    { name: 'Adaptability', level: 88, icon: '🔄', description: 'Quick learning and adaptation to new technologies' }
                  ]}
                  color="purple"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div 
          ref={el => sectionRefs.current[3] = el}
          data-section="3"
          className={`min-h-screen flex items-start justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-300 ${
            visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-6xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <div className={`transition-all duration-600 ease-out delay-400 ${
              visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <SectionHeader icon={<GraduationCap size={32} className="md:w-12 md:h-12" />} title="Experience & Education" subtitle="My learning journey" />
            </div>
            
            <div className="space-y-4 md:space-y-8 px-2 md:px-4">
              <div className={`transition-all duration-600 ease-out delay-500 ${
                visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <TimelineItem
                  type="education"
                  title="B.Tech in Computer Science"
                  organization="ABESIT, Ghaziabad"
                  period="2024 - 2028"
                  description="Pursuing comprehensive computer science education with focus on practical applications"
                  highlights={[
                    'Active participant in multiple hackathons including HackWithMAIT, IEEE BVCOE, and HackWithIndia',
                    'Developed innovative projects: Full Stack Web Applications, AI Attendance System, Face Detection App',
                    'Attended prestigious seminars: BECon at IIT Delhi, CodeHunt at Microsoft',
                    'Maintaining strong academic performance while pursuing practical projects'
                  ]}
                  icon="🎓"
                />
              </div>
              
              <div className={`transition-all duration-600 ease-out delay-600 ${
                visibleSections.has(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <TimelineItem
                  type="education"
                  title="High School Diploma"
                  organization="GD Goenka Public School, Ghaziabad"
                  period="2022 - 2024"
                  description="Foundation in science and technology with leadership experience"
                  highlights={[
                    'Served as President of Tech Club, leading technology initiatives',
                    'Achieved Runner-up position in Tech Event "Harmony"',
                    'Contributed as Video Editor for various Cultural Events',
                    'Developed leadership and organizational skills through extracurricular activities'
                  ]}
                  icon="🏫"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div 
          ref={el => sectionRefs.current[4] = el}
          data-section="4"
          className={`min-h-screen flex items-start justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-400 ${
            visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-7xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <div className={`transition-all duration-600 ease-out delay-500 ${
              visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <SectionHeader icon={<Briefcase size={32} className="md:w-12 md:h-12" />} title="Featured Projects" subtitle="What I've built" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 px-2 md:px-4">
              {[
                {
                  title: "AI Face Recognition System",
                  tech: ['Python', 'OpenCV', 'Machine Learning', 'TensorFlow'],
                  description: "Advanced attendance tracking system using facial recognition technology with real-time processing capabilities and secure data management.",
                  image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
                  gradient: "from-blue-500 to-purple-600",
                  link: "https://github.com/Harsh-Choudhary-21"
                },
                {
                  title: "Full Stack Web Application",
                  tech: ['React', 'Node.js', 'MongoDB', 'Express'],
                  description: "Complete web application featuring modern UI/UX design, robust backend architecture, and seamless user experience with authentication.",
                  image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
                  gradient: "from-green-500 to-teal-600",
                  link: "https://github.com/Harsh-Choudhary-21"
                },
                {
                  title: "Interactive Portfolio",
                  tech: ['React', 'TypeScript', 'Tailwind', 'Vanta.js'],
                  description: "This responsive portfolio built with modern technologies and enhanced with animated 3D backgrounds for an immersive user experience.",
                  image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
                  gradient: "from-purple-500 to-pink-600",
                  link: "https://github.com/Harsh-Choudhary-21"
                }
              ].map((project, index) => (
                <div 
                  key={project.title}
                  className={`transition-all duration-600 ease-out ${
                    visibleSections.has(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div 
          ref={el => sectionRefs.current[5] = el}
          data-section="5"
          className={`min-h-screen flex items-start justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-500 ${
            visibleSections.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-6xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <div className={`transition-all duration-600 ease-out delay-600 ${
              visibleSections.has(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <SectionHeader icon={<Award size={32} className="md:w-12 md:h-12" />} title="Achievements & Certifications" subtitle="Recognition of my work" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-2 md:px-4">
              <div className={`transition-all duration-600 ease-out delay-700 ${
                visibleSections.has(5) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`}>
                <GlassCard className="p-4 md:p-8">
                  <h3 className="text-lg md:text-2xl font-bold text-yellow-400 mb-4 md:mb-8 flex items-center space-x-2 md:space-x-3">
                    <Trophy size={20} className="md:w-7 md:h-7" />
                    <span>Certifications</span>
                  </h3>
                  <div className="space-y-3 md:space-y-6">
                    <CertificationCard 
                      title="HackerRank: SQL (Basic)" 
                      icon="🗄️"
                      description="Database management and query optimization"
                      issuer="HackerRank"
                    />
                    <CertificationCard 
                      title="HackerRank: Python Programming" 
                      icon="🐍"
                      description="Advanced Python programming concepts"
                      issuer="HackerRank"
                    />
                    <CertificationCard 
                      title="HackerRank: Problem Solving" 
                      icon="🧩"
                      description="Data structures and algorithms"
                      issuer="HackerRank"
                    />
                  </div>
                </GlassCard>
              </div>
              
              <div className={`transition-all duration-600 ease-out delay-800 ${
                visibleSections.has(5) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
              }`}>
                <GlassCard className="p-4 md:p-8">
                  <h3 className="text-lg md:text-2xl font-bold text-green-400 mb-4 md:mb-8 flex items-center space-x-2 md:space-x-3">
                    <Award size={20} className="md:w-7 md:h-7" />
                    <span>Achievements</span>
                  </h3>
                  <div className="space-y-3 md:space-y-6">
                    <AchievementCard 
                      title="Tech Club President"
                      description="Led technology initiatives and organized multiple tech events"
                      year="2023-2024"
                      icon="👑"
                    />
                    <AchievementCard 
                      title="Hackathon Participant"
                      description="Active participation in HackWithMAIT, IEEE BVCOE, HackWithIndia"
                      year="2024"
                      icon="💻"
                    />
                    <AchievementCard 
                      title="Runner-up in Tech Event"
                      description="Achieved second place in 'Harmony' tech competition"
                      year="2024"
                      icon="🥈"
                    />
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div 
          ref={el => sectionRefs.current[6] = el}
          data-section="6"
          className={`min-h-screen flex items-center justify-center p-3 md:p-8 transition-all duration-700 ease-out delay-600 ${
            visibleSections.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-5xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <div className={`transition-all duration-600 ease-out delay-700 ${
              visibleSections.has(6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <SectionHeader icon={<Mail size={32} className="md:w-12 md:h-12" />} title="Let's Connect" subtitle="Ready to collaborate" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 px-2 md:px-4">
              <div className={`transition-all duration-600 ease-out delay-800 ${
                visibleSections.has(6) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`}>
                <GlassCard className="p-6 md:p-10">
                  <h3 className="text-xl md:text-3xl font-bold text-cyan-400 mb-4 md:mb-6">Get In Touch</h3>
                  <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-4 md:mb-8">
                    I'm always excited to collaborate on innovative projects and explore new opportunities. 
                    Whether you're looking for a dedicated developer or want to discuss technology, let's connect!
                  </p>
                  
                  <div className="space-y-3 md:space-y-6">
                    <ContactDetail icon={<Mail size={18} className="md:w-6 md:h-6" />} label="Email" value="harshchoudhary227@gmail.com" />
                    <ContactDetail icon={<MapPin size={18} className="md:w-6 md:h-6" />} label="Location" value="Noida, Uttar Pradesh" />
                    <ContactDetail icon={<Phone size={18} className="md:w-6 md:h-6" />} label="Availability" value="Open to Opportunities" />
                  </div>
                </GlassCard>
              </div>
              
              <div className={`space-y-3 md:space-y-6 transition-all duration-600 ease-out delay-900 ${
                visibleSections.has(6) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
              }`}>
                <GlassCard className="p-4 md:p-8">
                  <h3 className="text-lg md:text-2xl font-bold text-purple-400 mb-3 md:mb-6">Languages</h3>
                  <div className="space-y-3 md:space-y-4">
                    <LanguageItem language="Hindi" level="Native" proficiency={100} />
                    <LanguageItem language="English" level="Proficient (C2)" proficiency={90} />
                  </div>
                </GlassCard>
                
                <GlassCard className="p-4 md:p-8">
                  <h3 className="text-lg md:text-2xl font-bold text-green-400 mb-3 md:mb-6">Connect With Me</h3>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <SocialButton href="https://github.com/Harsh-Choudhary-21" icon={<Github size={18} className="md:w-6 md:h-6" />} label="GitHub" />
                    <SocialButton href="https://www.linkedin.com/in/harsh-choudhary-b87837311/" icon={<Linkedin size={18} className="md:w-6 md:h-6" />} label="LinkedIn" />
                    <SocialButton href="https://leetcode.com/u/g3m0n_21/" icon={<CodeIcon size={18} className="md:w-6 md:h-6" />} label="LeetCode" />
                    <SocialButton href="https://www.hackerrank.com/profile/harshchoudhary26" icon={<Trophy size={18} className="md:w-6 md:h-6" />} label="HackerRank" />
                    <div className="col-span-2">
                      <SocialButton href="https://coff.ee/harsh.choudhary" icon={<Coffee size={18} className="md:w-6 md:h-6" />} label="Buy me a coffee ☕" />
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Dynamic Particles Component
function DynamicParticles({ mousePosition, scrollProgress, currentSection }: {
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
function AnimatedGradients({ currentSection, scrollProgress }: {
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
function FloatingShapes({ mousePosition }: { mousePosition: { x: number; y: number } }) {
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

export default App