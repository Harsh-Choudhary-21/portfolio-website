import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, MapPin, Download, ChevronDown, ExternalLink, Code2, Trophy, ArrowDown, Mouse, Phone, Calendar, Award, Briefcase, GraduationCap, User, Sparkles } from 'lucide-react'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
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
    const timer = setTimeout(() => setShowScrollHint(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      if (isTransitioning) return
      
      setIsTransitioning(true)
      
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1)
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1)
      }
      
      setTimeout(() => setIsTransitioning(false), 1000)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return
      
      setIsTransitioning(true)
      
      if ((e.key === 'ArrowDown' || e.key === 'ArrowRight') && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1)
      } else if ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') && currentSection > 0) {
        setCurrentSection(prev => prev - 1)
      }
      
      setTimeout(() => setIsTransitioning(false), 1000)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentSection, isTransitioning, sections.length])

  const navigateToSection = (index: number) => {
    if (isTransitioning || index === currentSection) return
    
    setIsTransitioning(true)
    setCurrentSection(index)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative">
      {/* Cursor Glow Effect */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-0 opacity-20 transition-opacity duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Spline 3D Background - Enhanced for all sections */}
      <div className="absolute inset-0 z-0">
        <spline-viewer 
          url="https://prod.spline.design/jMomamQ8e60As7MI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        <div className={`absolute inset-0 transition-all duration-1000 ${
          currentSection === 0 
            ? 'bg-gradient-to-b from-black/10 via-transparent to-black/40' 
            : 'bg-gradient-to-br from-black/70 via-black/50 to-black/70'
        } pointer-events-none`} />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      {showScrollHint && currentSection === 0 && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
          <div className="flex flex-col items-center text-white/90 space-y-3 bg-black/20 backdrop-blur-sm rounded-full px-6 py-4 border border-white/10">
            <Mouse size={28} className="text-cyan-400" />
            <div className="text-sm font-medium">Scroll to explore</div>
            <ArrowDown size={18} className="text-cyan-400" />
          </div>
        </div>
      )}

      {/* Enhanced Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-xl rounded-full px-8 py-4 border border-white/20 shadow-2xl">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => navigateToSection(index)}
              className={`relative group transition-all duration-500 ${
                currentSection === index 
                  ? 'w-12 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50' 
                  : 'w-3 h-3 bg-gray-500 hover:bg-gray-300 rounded-full hover:scale-125'
              }`}
              aria-label={`Go to ${section} section`}
            >
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap capitalize">
                {section}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sections Container */}
      <div 
        className="flex h-full w-full transition-transform duration-1000 ease-out relative z-10"
        style={{ transform: `translateX(-${currentSection * 100}%)` }}
      >
        {/* Hero Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8 relative">
          <div className="text-center space-y-12 max-w-6xl w-full relative z-20">
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
                <h1 className="relative text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    Harsh
                  </span>
                  <br />
                  <span className="text-white/95 font-light">Choudhary</span>
                </h1>
              </div>
              
              <div className="space-y-4">
                <p className="text-2xl md:text-3xl lg:text-4xl text-gray-200 max-w-4xl mx-auto px-4 leading-relaxed font-light">
                  Computer Science Student &
                </p>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Full-Stack Developer
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-gray-300">
              <ContactInfo icon={<Mail size={24} />} text="harshchoudhary227@gmail.com" />
              <ContactInfo icon={<MapPin size={24} />} text="Noida, Uttar Pradesh" />
            </div>
            
            <div className="flex justify-center space-x-10">
              <SocialLink href="https://github.com/Harsh-Choudhary-21" icon={<Github size={36} />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/harsh-choudhary-b87837311/" icon={<Linkedin size={36} />} label="LinkedIn" />
              <SocialLink href="https://leetcode.com/u/g3m0n_21/" icon={<Code2 size={36} />} label="LeetCode" />
              <SocialLink href="https://www.hackerrank.com/profile/harshchoudhary26" icon={<Trophy size={36} />} label="HackerRank" />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-8">
              <DownloadCVButton />
              <ContactMeButton />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-7xl w-full space-y-12">
            <SectionHeader icon={<User size={48} />} title="About Me" subtitle="Get to know who I am" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
              <div className="lg:col-span-2 space-y-8">
                <GlassCard className="p-10">
                  <h3 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center space-x-3">
                    <Sparkles size={32} />
                    <span>My Journey</span>
                  </h3>
                  <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                    <p>
                      I'm a passionate <strong className="text-white">Computer Science student</strong> pursuing my B.Tech degree with an insatiable curiosity for technology and innovation. My programming journey began with simple curiosity and has evolved into deep expertise across multiple domains.
                    </p>
                    <p>
                      I specialize in <strong className="text-cyan-400">full-stack development</strong>, <strong className="text-purple-400">machine learning</strong>, and <strong className="text-blue-400">artificial intelligence</strong>, always eager to tackle complex challenges and create meaningful solutions that make a difference.
                    </p>
                    <p>
                      Beyond coding, I'm a natural leader who thrives in collaborative environments, having served as President of my school's Tech Club and actively participating in hackathons and tech events across the country.
                    </p>
                  </div>
                </GlassCard>
              </div>
              
              <div className="space-y-6">
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-purple-400 mb-6">Quick Facts</h3>
                  <div className="space-y-4">
                    <FactItem icon="🎓" label="Education" value="B.Tech CSE" />
                    <FactItem icon="📍" label="Location" value="Noida, UP" />
                    <FactItem icon="💼" label="Status" value="Open to Work" />
                    <FactItem icon="🌐" label="Languages" value="Hindi, English" />
                  </div>
                </GlassCard>
                
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-green-400 mb-6">Interests</h3>
                  <div className="flex flex-wrap gap-3">
                    {['AI/ML', 'Web Dev', 'Competitive Programming', 'Tech Leadership', 'Innovation', 'Problem Solving'].map((interest) => (
                      <span key={interest} className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-300 rounded-full text-sm font-medium border border-green-500/30">
                        {interest}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-7xl w-full space-y-12">
            <SectionHeader icon={<Code2 size={48} />} title="Skills & Expertise" subtitle="Technologies I work with" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
              <SkillCategory 
                title="Technical Arsenal" 
                skills={[
                  { name: 'Python', level: 90, icon: '🐍' },
                  { name: 'C++', level: 85, icon: '⚡' },
                  { name: 'React.js', level: 80, icon: '⚛️' },
                  { name: 'Node.js', level: 75, icon: '🟢' },
                  { name: 'MySQL', level: 80, icon: '🗄️' },
                  { name: 'Machine Learning', level: 70, icon: '🤖' }
                ]}
                color="cyan"
              />
              <SkillCategory 
                title="Professional Skills" 
                skills={[
                  { name: 'Team Leadership', level: 85, icon: '👥' },
                  { name: 'Problem Solving', level: 90, icon: '🧩' },
                  { name: 'Communication', level: 80, icon: '💬' },
                  { name: 'Project Management', level: 75, icon: '📊' },
                  { name: 'Time Management', level: 85, icon: '⏰' },
                  { name: 'Adaptability', level: 88, icon: '🔄' }
                ]}
                color="purple"
              />
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-6xl w-full space-y-12">
            <SectionHeader icon={<GraduationCap size={48} />} title="Experience & Education" subtitle="My learning journey" />
            
            <div className="space-y-8 px-4">
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
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-7xl w-full space-y-12">
            <SectionHeader icon={<Briefcase size={48} />} title="Featured Projects" subtitle="What I've built" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
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
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-6xl w-full space-y-12">
            <SectionHeader icon={<Award size={48} />} title="Achievements & Certifications" subtitle="Recognition of my work" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-8 flex items-center space-x-3">
                  <Trophy size={28} />
                  <span>Certifications</span>
                </h3>
                <div className="space-y-6">
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
              
              <GlassCard className="p-8">
                <h3 className="text-2xl font-bold text-green-400 mb-8 flex items-center space-x-3">
                  <Sparkles size={28} />
                  <span>Achievements</span>
                </h3>
                <div className="space-y-6">
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
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-5xl w-full space-y-12">
            <SectionHeader icon={<Mail size={48} />} title="Let's Connect" subtitle="Ready to collaborate" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
              <GlassCard className="p-10">
                <h3 className="text-3xl font-bold text-cyan-400 mb-6">Get In Touch</h3>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  I'm always excited to collaborate on innovative projects and explore new opportunities. 
                  Whether you're looking for a dedicated developer or want to discuss technology, let's connect!
                </p>
                
                <div className="space-y-6">
                  <ContactDetail icon={<Mail size={24} />} label="Email" value="harshchoudhary227@gmail.com" />
                  <ContactDetail icon={<MapPin size={24} />} label="Location" value="Noida, Uttar Pradesh" />
                  <ContactDetail icon={<Phone size={24} />} label="Availability" value="Open to Opportunities" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 pt-8">
                  <ContactMeButton />
                  <DownloadCVButton />
                </div>
              </GlassCard>
              
              <div className="space-y-6">
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-purple-400 mb-6">Languages</h3>
                  <div className="space-y-4">
                    <LanguageItem language="Hindi" level="Native" proficiency={100} />
                    <LanguageItem language="English" level="Proficient (C2)" proficiency={90} />
                  </div>
                </GlassCard>
                
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-green-400 mb-6">Connect With Me</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <SocialButton href="https://github.com/Harsh-Choudhary-21" icon={<Github size={24} />} label="GitHub" />
                    <SocialButton href="https://www.linkedin.com/in/harsh-choudhary-b87837311/" icon={<Linkedin size={24} />} label="LinkedIn" />
                    <SocialButton href="https://leetcode.com/u/g3m0n_21/" icon={<Code2 size={24} />} label="LeetCode" />
                    <SocialButton href="https://www.hackerrank.com/profile/harshchoudhary26" icon={<Trophy size={24} />} label="HackerRank" />
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Indicator */}
      <div className="fixed top-6 left-6 z-50 text-white">
        <div className="bg-black/30 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20 shadow-2xl">
          <div className="text-sm opacity-70 mb-1">
            {currentSection + 1} / {sections.length}
          </div>
          <div className="text-xl font-bold capitalize bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
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
    <div className="text-center space-y-4">
      <div className="flex justify-center text-cyan-400 mb-4">
        {icon}
      </div>
      <h2 className="text-5xl md:text-7xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-xl text-gray-400 font-light">{subtitle}</p>
    </div>
  )
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-cyan-500/20 ${className}`}>
      {children}
    </div>
  )
}

function ContactInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-4 hover:text-cyan-400 transition-colors duration-300 group bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
      <div className="group-hover:scale-110 transition-transform duration-300 text-cyan-400">
        {icon}
      </div>
      <span className="text-lg font-medium">{text}</span>
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
      <div className="text-gray-400 hover:text-cyan-400 transform hover:scale-125 transition-all duration-300 hover:drop-shadow-lg hover:drop-shadow-cyan-400/50 group-hover:animate-pulse bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-cyan-400/50">
        {icon}
      </div>
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/20">
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
      className="group relative inline-flex items-center space-x-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-5 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50 text-lg overflow-hidden border border-cyan-400/20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <Download size={24} />
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
      className="group relative inline-flex items-center space-x-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 text-lg overflow-hidden border border-purple-400/20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <Mail size={24} />
      <span className="relative z-10">Contact Me</span>
    </a>
  )
}

function SkillCategory({ title, skills, color }: { 
  title: string; 
  skills: { name: string; level: number; icon: string }[];
  color: string;
}) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    purple: 'from-purple-500 to-pink-600',
  }

  return (
    <GlassCard className="p-10 group">
      <h3 className={`text-3xl font-bold mb-8 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} bg-clip-text text-transparent flex items-center space-x-3`}>
        <span>{title}</span>
      </h3>
      <div className="space-y-6">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{skill.icon}</span>
                <span className="text-white font-semibold text-lg">{skill.name}</span>
              </div>
              <span className="text-gray-400 font-medium">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse shadow-lg`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
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
    <GlassCard className="p-10 group">
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start space-x-6 mb-6">
          <div className="text-4xl bg-gradient-to-r from-cyan-400 to-purple-500 p-4 rounded-2xl">{icon}</div>
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
              {title}
            </h3>
            <div className="text-gray-400 text-xl mt-2 font-medium">{organization}</div>
            <div className="text-cyan-400 text-lg mt-1 font-semibold">{period}</div>
            <p className="text-gray-300 mt-4 text-lg leading-relaxed">{description}</p>
          </div>
        </div>
        
        <div className={`transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <ul className="space-y-4 text-gray-300 ml-20">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start space-x-4 hover:text-cyan-400 transition-colors duration-300">
                <div className="w-3 h-3 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-cyan-400 font-medium mt-6 group-hover:underline flex items-center space-x-2 ml-20">
          <span>{isExpanded ? 'Show less' : 'Show more details'}</span>
          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
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
        <div className="relative h-56 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60`} />
          <div className="absolute top-4 right-4">
            <ExternalLink size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        <div className="p-8 space-y-6">
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
            {title}
          </h3>
          <div className="flex flex-wrap gap-3">
            {tech.map((t) => (
              <span
                key={t}
                className="px-4 py-2 bg-white/10 text-cyan-400 rounded-full text-sm font-medium border border-cyan-400/30"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-gray-300 leading-relaxed">{description}</p>
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
    <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 group">
      <div className="flex items-start space-x-4">
        <div className="text-3xl bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl">{icon}</div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors duration-300">{title}</h4>
          <p className="text-gray-400 text-sm mb-2">{description}</p>
          <p className="text-yellow-400 text-sm font-semibold">{issuer}</p>
        </div>
        <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></div>
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
    <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 group">
      <div className="flex items-start space-x-4">
        <div className="text-3xl bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-xl">{icon}</div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-lg mb-2 group-hover:text-green-400 transition-colors duration-300">{title}</h4>
          <p className="text-gray-400 text-sm mb-2">{description}</p>
          <p className="text-green-400 text-sm font-semibold">{year}</p>
        </div>
      </div>
    </div>
  )
}

function FactItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-gray-400 text-sm">{label}</div>
        <div className="text-white font-semibold">{value}</div>
      </div>
    </div>
  )
}

function ContactDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="text-cyan-400">{icon}</div>
      <div>
        <div className="text-gray-400 text-sm">{label}</div>
        <div className="text-white font-semibold">{value}</div>
      </div>
    </div>
  )
}

function LanguageItem({ language, level, proficiency }: { language: string; level: string; proficiency: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold">{language}</span>
        <span className="text-gray-400 text-sm">{level}</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2">
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
      className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
    >
      <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <span className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300">{label}</span>
    </a>
  )
}

export default App