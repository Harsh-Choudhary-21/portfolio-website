import React, { useState, useEffect, useRef } from 'react'
import { NavigationArrows, NavigationDots, SectionIndicator } from './components/Navigation'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { Code2, GraduationCap, Briefcase, Award, Mail } from 'lucide-react'
import { SectionHeader, GlassCard } from './components/UI'
import { FlipSkillCategory } from './components/SkillsComponents'
import { TimelineItem } from './components/ExperienceComponents'
import { ProjectCard, CertificationCard, AchievementCard } from './components/ProjectsComponents'
import { ContactDetail, LanguageItem, SocialButton } from './components/ContactComponents'
import { Github, Linkedin, Code2 as CodeIcon, Trophy, MapPin, Phone } from 'lucide-react'

// Declare Vanta for TypeScript
declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const vantaRef = useRef<HTMLDivElement>(null)
  const vantaEffect = useRef<any>(null)

  const sections = [
    'hero',
    'about',
    'skills',
    'experience',
    'projects',
    'achievements',
    'contact'
  ]

  // Initialize Vanta.js background
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
        backgroundColor: 0x000000,
        points: 10.00,
        maxDistance: 20.00,
        spacing: 15.00
      })
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      try {
        setMousePosition({ x: e.clientX, y: e.clientY })
      } catch (error) {
        console.warn('Mouse move error:', error)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      try {
        if (isTransitioning) return
        
        if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
          e.preventDefault()
          setIsTransitioning(true)
          setCurrentSection(prev => prev + 1)
          setTimeout(() => setIsTransitioning(false), 800)
        } else if (e.key === 'ArrowLeft' && currentSection > 0) {
          e.preventDefault()
          setIsTransitioning(true)
          setCurrentSection(prev => prev - 1)
          setTimeout(() => setIsTransitioning(false), 800)
        }
      } catch (error) {
        console.warn('Keyboard navigation error:', error)
        setIsTransitioning(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, isTransitioning, sections.length])

  const navigateToSection = (index: number) => {
    try {
      if (isTransitioning || index === currentSection || index < 0 || index >= sections.length) return
      
      setIsTransitioning(true)
      setCurrentSection(index)
      setTimeout(() => setIsTransitioning(false), 800)
    } catch (error) {
      console.warn('Navigation error:', error)
      setIsTransitioning(false)
    }
  }

  const goToPrevSection = () => {
    if (currentSection > 0) {
      navigateToSection(currentSection - 1)
    }
  }

  const goToNextSection = () => {
    if (currentSection < sections.length - 1) {
      navigateToSection(currentSection + 1)
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative">
      {/* Vanta.js Background */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Overlay for better text readability */}
      <div className={`absolute inset-0 z-5 transition-all duration-1000 ${
        currentSection === 0 
          ? 'bg-gradient-to-b from-black/30 via-transparent to-black/60' 
          : 'bg-gradient-to-br from-black/70 via-black/60 to-black/80'
      } pointer-events-none`} />

      {/* Cursor Glow Effect - Hidden on mobile */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-10 opacity-20 transition-opacity duration-300 hidden md:block"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Additional Floating Particles - Reduced on mobile */}
      <div className="absolute inset-0 z-15">
        {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Navigation Components */}
      <NavigationArrows 
        currentSection={currentSection}
        sections={sections}
        onPrevious={goToPrevSection}
        onNext={goToNextSection}
      />
      
      <NavigationDots 
        currentSection={currentSection}
        sections={sections}
        onNavigate={navigateToSection}
      />
      
      <SectionIndicator 
        currentSection={currentSection}
        sections={sections}
      />

      {/* Sections Container */}
      <div 
        className="flex h-full w-full transition-transform duration-800 ease-out relative z-20"
        style={{ transform: `translateX(-${currentSection * 100}%)` }}
      >
        <HeroSection />
        <AboutSection />
        
        {/* Skills Section */}
        <div className="min-w-full h-full flex items-start justify-center p-3 md:p-8 overflow-y-auto">
          <div className="max-w-7xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <SectionHeader icon={<Code2 size={32} className="md:w-12 md:h-12" />} title="Skills & Expertise" subtitle="Technologies I work with" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 px-2 md:px-4">
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

        {/* Experience Section */}
        <div className="min-w-full h-full flex items-start justify-center p-3 md:p-8 overflow-y-auto">
          <div className="max-w-6xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <SectionHeader icon={<GraduationCap size={32} className="md:w-12 md:h-12" />} title="Experience & Education" subtitle="My learning journey" />
            
            <div className="space-y-4 md:space-y-8 px-2 md:px-4">
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

        {/* Projects Section */}
        <div className="min-w-full h-full flex items-start justify-center p-3 md:p-8 overflow-y-auto">
          <div className="max-w-7xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <SectionHeader icon={<Briefcase size={32} className="md:w-12 md:h-12" />} title="Featured Projects" subtitle="What I've built" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 px-2 md:px-4">
              <ProjectCard
                title="AI Face Recognition System"
                tech={['Python', 'OpenCV', 'Machine Learning', 'TensorFlow']}
                description="Advanced attendance tracking system using facial recognition technology with real-time processing capabilities and secure data management."
                image="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop"
                gradient="from-blue-500 to-purple-600"
                link="https://github.com/Harsh-Choudhary-21"
              />
              
              <ProjectCard
                title="Full Stack Web Application"
                tech={['React', 'Node.js', 'MongoDB', 'Express']}
                description="Complete web application featuring modern UI/UX design, robust backend architecture, and seamless user experience with authentication."
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                gradient="from-green-500 to-teal-600"
                link="https://github.com/Harsh-Choudhary-21"
              />
              
              <ProjectCard
                title="Interactive Portfolio"
                tech={['React', 'TypeScript', 'Tailwind', 'Vanta.js']}
                description="This responsive portfolio built with modern technologies and enhanced with animated 3D backgrounds for an immersive user experience."
                image="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop"
                gradient="from-purple-500 to-pink-600"
                link="https://github.com/Harsh-Choudhary-21"
              />
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="min-w-full h-full flex items-start justify-center p-3 md:p-8 overflow-y-auto">
          <div className="max-w-6xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <SectionHeader icon={<Award size={32} className="md:w-12 md:h-12" />} title="Achievements & Certifications" subtitle="Recognition of my work" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-2 md:px-4">
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

        {/* Contact Section */}
        <div className="min-w-full h-full flex items-center justify-center p-3 md:p-8 overflow-y-auto">
          <div className="max-w-5xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <SectionHeader icon={<Mail size={32} className="md:w-12 md:h-12" />} title="Let's Connect" subtitle="Ready to collaborate" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 px-2 md:px-4">
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
              
              <div className="space-y-3 md:space-y-6">
                <GlassCard className="p-4 md:p-8">
                  <h3 className="text-lg md:text-2xl font-bold text-purple-400 mb-3 md:mb-6">Languages</h3>
                  <div className="space-y-3 md:space-y-4">
                    <LanguageItem language="Hindi" level="Native" proficiency={100} />
                    <LanguageItem language="English" level="Proficient (C2)" proficiency={90} />
                  </div>
                </GlassCard>
                
                <GlassCard className="p-4 md:p-8">
                  <h3 className="text-lg md:text-2xl font-bold text-green-400 mb-3 md:mb-6">Connect With Me</h3>
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <SocialButton href="https://github.com/Harsh-Choudhary-21" icon={<Github size={18} className="md:w-6 md:h-6" />} label="GitHub" />
                    <SocialButton href="https://www.linkedin.com/in/harsh-choudhary-b87837311/" icon={<Linkedin size={18} className="md:w-6 md:h-6" />} label="LinkedIn" />
                    <SocialButton href="https://leetcode.com/u/g3m0n_21/" icon={<CodeIcon size={18} className="md:w-6 md:h-6" />} label="LeetCode" />
                    <SocialButton href="https://www.hackerrank.com/profile/harshchoudhary26" icon={<Trophy size={18} className="md:w-6 md:h-6" />} label="HackerRank" />
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

export default App