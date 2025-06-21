import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, MapPin, Download, ChevronDown, ExternalLink, Code2, Trophy, ArrowDown, Mouse, Phone, Calendar, Award, Briefcase, GraduationCap, User, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const sections = [
    'hero',
    'about',
    'skills',
    'experience',
    'projects',
    'achievements',
    'contact'
  ]

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
        
        // Only handle left/right arrows for section navigation
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
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
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
      {/* Cursor Glow Effect - Hidden on mobile */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-0 opacity-20 transition-opacity duration-300 hidden md:block"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Spline Particles Background */}
      <div className="absolute inset-0 z-0">
        <spline-viewer url="https://prod.spline.design/2dIHknQu2aiwt97C/scene.splinecode" style={{width: '100%', height: '100%'}}></spline-viewer>
        <div className={`absolute inset-0 transition-all duration-1000 ${
          currentSection === 0 
            ? 'bg-gradient-to-b from-black/20 via-transparent to-black/50' 
            : 'bg-gradient-to-br from-black/70 via-black/60 to-black/80'
        } pointer-events-none`} />
      </div>

      {/* Additional Floating Particles - Reduced on mobile */}
      <div className="absolute inset-0 z-5">
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

      {/* Navigation Arrows - Fixed positioning */}
      <div className="fixed left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-3 md:space-y-4">
        <button
          onClick={goToPrevSection}
          disabled={currentSection === 0}
          className={`p-3 md:p-4 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            currentSection === 0 
              ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed' 
              : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/40 hover:text-white active:scale-95'
          }`}
          aria-label="Previous section"
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </button>
        <button
          onClick={goToNextSection}
          disabled={currentSection === sections.length - 1}
          className={`p-3 md:p-4 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            currentSection === sections.length - 1 
              ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed' 
              : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/40 hover:text-white active:scale-95'
          }`}
          aria-label="Next section"
        >
          <ChevronRight size={20} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* Enhanced Navigation - Fixed positioning */}
      <div className="fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-3 md:space-x-4 bg-black/40 backdrop-blur-xl rounded-full px-6 md:px-8 py-3 md:py-4 border border-white/30 shadow-2xl">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => navigateToSection(index)}
              className={`relative group transition-all duration-500 ${
                currentSection === index 
                  ? 'w-10 md:w-12 h-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50' 
                  : 'w-3 md:w-3 h-3 md:h-3 bg-gray-500 hover:bg-gray-300 rounded-full hover:scale-125'
              }`}
              aria-label={`Go to ${section} section`}
            >
              <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 md:px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap capitalize">
                {section}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sections Container */}
      <div 
        className="flex h-full w-full transition-transform duration-800 ease-out relative z-10"
        style={{ transform: `translateX(-${currentSection * 100}%)` }}
      >
        {/* Hero Section */}
        <div className="min-w-full h-full flex items-center justify-center p-3 md:p-8 relative overflow-y-auto">
          <div className="text-center space-y-4 md:space-y-8 max-w-6xl w-full relative z-20 py-4 md:py-8">
            <div className="space-y-4 md:space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 rounded-3xl blur-3xl"></div>
                <h1 className="relative text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-3 md:mb-6 tracking-tight break-words">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    Harsh
                  </span>
                  <br />
                  <span className="text-white/95 font-light">Choudhary</span>
                </h1>
              </div>
              
              <div className="space-y-2 md:space-y-4">
                <p className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl text-gray-200 max-w-4xl mx-auto px-2 md:px-4 leading-relaxed font-light break-words">
                  Computer Science Student &
                </p>
                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent break-words">
                  AI-ML Enthusiast
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 max-w-2xl mx-auto text-gray-300 px-2">
              <ContactInfo icon={<Mail size={18} className="md:w-6 md:h-6" />} text="harshchoudhary227@gmail.com" />
              <ContactInfo icon={<MapPin size={18} className="md:w-6 md:h-6" />} text="Noida, Uttar Pradesh" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              <SocialLink href="https://github.com/Harsh-Choudhary-21" icon={<Github size={20} className="md:w-7 md:h-7" />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/harsh-choudhary-b87837311/" icon={<Linkedin size={20} className="md:w-7 md:h-7" />} label="LinkedIn" />
              <SocialLink href="https://leetcode.com/u/g3m0n_21/" icon={<Code2 size={20} className="md:w-7 md:h-7" />} label="LeetCode" />
              <SocialLink href="https://www.hackerrank.com/profile/harshchoudhary26" icon={<Trophy size={20} className="md:w-7 md:h-7" />} label="HackerRank" />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 pt-4 md:pt-8">
              <DownloadCVButton />
              <ContactMeButton />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="min-w-full h-full flex items-start justify-center p-3 md:p-8 overflow-y-auto">
          <div className="max-w-7xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
            <SectionHeader icon={<User size={32} className="md:w-12 md:h-12" />} title="About Me" subtitle="Get to know who I am" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 px-2 md:px-4">
              <div className="lg:col-span-2 space-y-4 md:space-y-8">
                <GlassCard className="p-4 md:p-8">
                  <h3 className="text-lg md:text-2xl xl:text-3xl font-bold text-cyan-400 mb-3 md:mb-4 flex items-center space-x-2">
                    <Sparkles size={18} className="md:w-6 md:h-6" />
                    <span>My Journey</span>
                  </h3>
                  <div className="space-y-3 md:space-y-4 text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-none">
                    <p className="break-words">
                      I'm a passionate <strong className="text-white">Computer Science student</strong> pursuing my B.Tech degree with curiosity for technology and innovation. My programming journey began with simple curiosity and has evolved into expertise across multiple domains.
                    </p>
                    <p className="break-words">
                      I specialize in <strong className="text-cyan-400">full-stack development</strong>, <strong className="text-purple-400">machine learning</strong>, and <strong className="text-blue-400">artificial intelligence</strong>, always eager to tackle complex challenges and create meaningful solutions.
                    </p>
                    <p className="break-words">
                      Beyond coding, I'm a natural leader who thrives in collaborative environments, having served as President of my school's Tech Club and actively participating in hackathons and tech events.
                    </p>
                  </div>
                </GlassCard>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <GlassCard className="p-3 md:p-6">
                  <h3 className="text-base md:text-xl xl:text-2xl font-bold text-purple-400 mb-3 md:mb-4">Quick Facts</h3>
                  <div className="space-y-2 md:space-y-3">
                    <FactItem icon="🎓" label="Education" value="B.Tech CSE" />
                    <FactItem icon="📍" label="Location" value="Noida, UP" />
                    <FactItem icon="💼" label="Status" value="Open to Work" />
                    <FactItem icon="🌐" label="Languages" value="Hindi, English" />
                  </div>
                </GlassCard>
                
                <GlassCard className="p-3 md:p-6">
                  <h3 className="text-base md:text-xl xl:text-2xl font-bold text-green-400 mb-3 md:mb-4">Interests</h3>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {['AI/ML', 'Web Dev', 'Competitive Programming', 'Tech Leadership', 'Innovation', 'Problem Solving'].map((interest) => (
                      <span key={interest} className="px-2 md:px-3 py-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 rounded-full text-xs md:text-sm font-medium border border-green-500/30 break-words">
                        {interest}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section with Flip Cards */}
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
                tech={['React', 'TypeScript', 'Tailwind', 'Spline']}
                description="This responsive portfolio built with modern technologies and enhanced with 3D elements for an immersive user experience."
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
                  <Sparkles size={20} className="md:w-7 md:h-7" />
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

        {/* Contact Section - Fixed layout */}
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
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-6 pt-4 md:pt-8">
                  <ContactMeButton />
                  <DownloadCVButton />
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
                    <SocialButton href="https://leetcode.com/u/g3m0n_21/" icon={<Code2 size={18} className="md:w-6 md:h-6" />} label="LeetCode" />
                    <SocialButton href="https://www.hackerrank.com/profile/harshchoudhary26" icon={<Trophy size={18} className="md:w-6 md:h-6" />} label="HackerRank" />
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Indicator - Fixed positioning */}
      <div className="fixed top-4 md:top-6 left-4 md:left-6 z-50 text-white">
        <div className="bg-black/40 backdrop-blur-xl rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-white/30 shadow-2xl">
          <div className="text-xs md:text-sm opacity-70 mb-1">
            {currentSection + 1} / {sections.length}
          </div>
          <div className="text-sm md:text-xl font-bold capitalize bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {sections[currentSection].replace('-', ' ')}
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Components
function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="text-center space-y-2 md:space-y-4">
      <div className="flex justify-center text-cyan-400 mb-2 md:mb-4">
        {icon}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent break-words">
        {title}
      </h2>
      <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-400 font-light break-words">{subtitle}</p>
    </div>
  )
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-cyan-500/20 ${className}`}>
      {children}
    </div>
  )
}

function ContactInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-2 md:space-x-4 hover:text-cyan-400 transition-colors duration-300 group bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-4 border border-white/20">
      <div className="group-hover:scale-110 transition-transform duration-300 text-cyan-400 flex-shrink-0">
        {icon}
      </div>
      <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium break-words min-w-0">{text}</span>
    </div>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative"
      aria-label={label}
    >
      <div className="text-gray-400 hover:text-cyan-400 transform hover:scale-125 transition-all duration-300 hover:drop-shadow-lg hover:drop-shadow-cyan-400/50 group-hover:animate-pulse bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/20 hover:border-cyan-400/50">
        {icon}
      </div>
      <div className="absolute -bottom-10 md:-bottom-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/20">
        {label}
      </div>
    </a>
  )
}

function DownloadCVButton() {
  return (
    <a
      href="https://docs.google.com/document/d/1p5kJmYtuBKdmO691Xsi8aZBPWptXph7n/edit?usp=sharing&ouid=103310832046668757715&rtpof=true&sd=true"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center space-x-2 md:space-x-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50 text-sm md:text-lg overflow-hidden border border-cyan-400/20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <Download size={18} className="md:w-6 md:h-6" />
      <span className="relative z-10">Download CV</span>
    </a>
  )
}

function ContactMeButton() {
  return (
    <a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=harshchoudhary227@gmail.com&su=Contact%20from%20Portfolio&body=Hi%20Harsh,%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch.%0A%0ABest%20regards"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center space-x-2 md:space-x-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 text-sm md:text-lg overflow-hidden border border-purple-400/20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <Mail size={18} className="md:w-6 md:h-6" />
      <span className="relative z-10">Contact Me</span>
    </a>
  )
}

// New Flip Card Skill Component
function FlipSkillCategory({ title, skills, color }: { 
  title: string; 
  skills: { name: string; level: number; icon: string; description: string }[];
  color: string;
}) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    purple: 'from-purple-500 to-pink-600',
  }

  return (
    <GlassCard className="p-3 md:p-6 group">
      <h3 className={`text-base md:text-xl xl:text-2xl font-bold mb-3 md:mb-6 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} bg-clip-text text-transparent`}>
        {title}
      </h3>
      <div className="space-y-3 md:space-y-4">
        {skills.map((skill) => (
          <FlipSkillCard key={skill.name} skill={skill} color={color} />
        ))}
      </div>
    </GlassCard>
  )
}

function FlipSkillCard({ skill, color }: { 
  skill: { name: string; level: number; icon: string; description: string };
  color: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    purple: 'from-purple-500 to-pink-600',
  }

  return (
    <div 
      className="flip-card h-16 md:h-20 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side */}
        <div className="flip-card-front bg-white/10 rounded-xl border border-white/20 p-3 md:p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg md:text-xl">{skill.icon}</span>
              <span className="text-white font-semibold text-sm md:text-base">{skill.name}</span>
            </div>
            <span className="text-gray-400 font-medium text-xs md:text-sm">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full transition-all duration-1000 ease-out shadow-lg`}
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
        
        {/* Back Side */}
        <div className="flip-card-back bg-white/15 rounded-xl border border-white/30 p-3 md:p-4">
          <div className="flex items-start space-x-2 h-full">
            <span className="text-lg md:text-xl flex-shrink-0">{skill.icon}</span>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm md:text-base mb-1">{skill.name}</h4>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{skill.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimelineItem({ type, title, organization, period, description, highlights, icon }: {
  type: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  icon: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <GlassCard className="p-3 md:p-6 group">
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start space-x-2 md:space-x-4 mb-3 md:mb-4">
          <div className="text-xl md:text-2xl xl:text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 p-2 md:p-3 rounded-xl flex-shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-xl xl:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 break-words">
              {title}
            </h3>
            <div className="text-gray-400 text-sm md:text-base lg:text-lg mt-1 font-medium break-words">{organization}</div>
            <div className="text-cyan-400 text-xs md:text-sm lg:text-base mt-1 font-semibold">{period}</div>
            <p className="text-gray-300 mt-2 md:mt-3 text-xs md:text-sm lg:text-base leading-relaxed break-words">{description}</p>
          </div>
        </div>
        
        <div className={`transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <ul className="space-y-2 md:space-y-3 text-gray-300 ml-2 md:ml-8">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start space-x-2 hover:text-cyan-400 transition-colors duration-300">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full mt-1 md:mt-2 flex-shrink-0"></div>
                <span className="leading-relaxed text-xs md:text-sm">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-cyan-400 font-medium mt-3 md:mt-6 group-hover:underline flex items-center space-x-1 md:space-x-2 ml-12 md:ml-20">
          <span className="text-xs md:text-sm">{isExpanded ? 'Show less' : 'Show more details'}</span>
          <ChevronDown className={`w-3 h-3 md:w-5 md:h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
    </GlassCard>
  )
}

function ProjectCard({ title, tech, description, image, gradient, link }: { 
  title: string; 
  tech: string[]; 
  description: string;
  image: string;
  gradient: string;
  link: string;
}) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group">
      <GlassCard className="overflow-hidden cursor-pointer h-full">
        <div className="relative h-32 md:h-40 xl:h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop';
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60`} />
          <div className="absolute top-2 right-2">
            <ExternalLink size={16} className="md:w-5 md:h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        <div className="p-3 md:p-6 space-y-2 md:space-y-4">
          <h3 className="text-sm md:text-lg xl:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 break-words">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-white/10 text-cyan-400 rounded-full text-xs md:text-sm font-medium border border-cyan-400/30 break-words"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-gray-300 leading-relaxed text-xs md:text-sm lg:text-base break-words">{description}</p>
        </div>
      </GlassCard>
    </a>
  )
}

function CertificationCard({ title, icon, description, issuer }: { 
  title: string; 
  icon: string;
  description: string;
  issuer: string;
}) {
  return (
    <div className="bg-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 border border-white/20 group">
      <div className="flex items-start space-x-2 md:space-x-3">
        <div className="text-lg md:text-2xl xl:text-3xl bg-gradient-to-r from-yellow-400 to-orange-500 p-2 md:p-3 rounded-xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm md:text-base lg:text-lg mb-1 md:mb-2 group-hover:text-yellow-400 transition-colors duration-300 break-words">{title}</h4>
          <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2 break-words">{description}</p>
          <p className="text-yellow-400 text-xs md:text-sm font-semibold break-words">{issuer}</p>
        </div>
        <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></div>
      </div>
    </div>
  )
}

function AchievementCard({ title, description, year, icon }: { 
  title: string; 
  description: string;
  year: string;
  icon: string;
}) {
  return (
    <div className="bg-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 border border-white/20 group">
      <div className="flex items-start space-x-2 md:space-x-3">
        <div className="text-lg md:text-2xl xl:text-3xl bg-gradient-to-r from-green-400 to-blue-500 p-2 md:p-3 rounded-xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm md:text-base lg:text-lg mb-1 md:mb-2 group-hover:text-green-400 transition-colors duration-300 break-words">{title}</h4>
          <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2 break-words">{description}</p>
          <p className="text-green-400 text-xs md:text-sm font-semibold">{year}</p>
        </div>
      </div>
    </div>
  )
}

function FactItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2 md:space-x-3">
      <span className="text-sm md:text-lg xl:text-xl flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className="text-gray-400 text-xs md:text-sm">{label}</div>
        <div className="text-white font-semibold text-xs md:text-sm lg:text-base break-words">{value}</div>
      </div>
    </div>
  )
}

function ContactDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2 md:space-x-4 p-2 md:p-4 bg-white/10 rounded-xl md:rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="text-cyan-400 flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-gray-400 text-xs md:text-sm">{label}</div>
        <div className="text-white font-semibold text-xs md:text-sm lg:text-base break-words">{value}</div>
      </div>
    </div>
  )
}

function LanguageItem({ language, level, proficiency }: { language: string; level: string; proficiency: number }) {
  return (
    <div className="space-y-1 md:space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold text-xs md:text-sm lg:text-base break-words">{language}</span>
        <span className="text-gray-400 text-xs md:text-sm flex-shrink-0">{level}</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-1.5 md:h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000"
          style={{ width: `${proficiency}%` }}
        />
      </div>
    </div>
  )
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-1 md:space-x-3 p-2 md:p-4 bg-white/10 rounded-xl md:rounded-2xl border border-white/20 hover:bg-white/15 hover:border-cyan-400/50 transition-all duration-300 group"
    >
      <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">{icon}</div>
      <span className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300 text-xs md:text-sm lg:text-base break-words">{label}</span>
    </a>
  )
}

export default App