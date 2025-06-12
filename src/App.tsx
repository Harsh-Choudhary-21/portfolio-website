import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, MapPin, Download, ChevronLeft, ChevronRight, ExternalLink, Code2, Trophy, ArrowDown, Mouse } from 'lucide-react'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)

  const sections = [
    'hero',
    'about',
    'skills',
    'education',
    'projects',
    'project-links',
    'certifications',
    'contact'
  ]

  useEffect(() => {
    // Hide scroll hint after 3 seconds
    const timer = setTimeout(() => setShowScrollHint(false), 3000)
    return () => clearTimeout(timer)
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
      
      setTimeout(() => setIsTransitioning(false), 800)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return
      
      setIsTransitioning(true)
      
      if (e.key === 'ArrowRight' && currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1)
      } else if (e.key === 'ArrowLeft' && currentSection > 0) {
        setCurrentSection(prev => prev - 1)
      }
      
      setTimeout(() => setIsTransitioning(false), 800)
    }

    // Touch handling for mobile
    let touchStartX = 0
    let touchStartY = 0
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioning) return
      
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const deltaX = touchEndX - touchStartX
      const deltaY = touchEndY - touchStartY
      
      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        setIsTransitioning(true)
        
        if (deltaX > 0 && currentSection > 0) {
          setCurrentSection(prev => prev - 1)
        } else if (deltaX < 0 && currentSection < sections.length - 1) {
          setCurrentSection(prev => prev + 1)
        }
        
        setTimeout(() => setIsTransitioning(false), 800)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSection, isTransitioning, sections.length])

  const navigateToSection = (index: number) => {
    if (isTransitioning || index === currentSection) return
    
    setIsTransitioning(true)
    setCurrentSection(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  // Calculate visible dots for horizontal navigation
  const getVisibleDots = () => {
    const maxVisible = 4
    const totalSections = sections.length
    
    if (totalSections <= maxVisible) {
      return Array.from({ length: totalSections }, (_, i) => i)
    }
    
    let start = Math.max(0, currentSection - Math.floor(maxVisible / 2))
    let end = Math.min(totalSections - 1, start + maxVisible - 1)
    
    if (end - start < maxVisible - 1) {
      start = Math.max(0, end - maxVisible + 1)
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const visibleDots = getVisibleDots()

  return (
    <div className="h-screen w-screen overflow-hidden bg-black relative">
      {/* Spline 3D Background - Only on Hero Section */}
      {currentSection === 0 && (
        <div className="absolute inset-0 z-0">
          <spline-viewer 
            url="https://prod.spline.design/jMomamQ8e60As7MI/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
        </div>
      )}

      {/* Gradient Background for other sections */}
      {currentSection !== 0 && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      )}

      {/* Scroll Hint */}
      {showScrollHint && currentSection === 0 && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
          <div className="flex flex-col items-center text-white/80 space-y-2">
            <Mouse size={24} />
            <div className="text-sm">Scroll to explore</div>
            <ArrowDown size={16} />
          </div>
        </div>
      )}

      {/* Horizontal Navigation Dots */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 navigation-element">
        <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
          {visibleDots.map((index) => (
            <button
              key={index}
              onClick={() => navigateToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                currentSection === index 
                  ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50' 
                  : 'bg-gray-500 hover:bg-gray-400 hover:scale-110'
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
          {sections.length > 4 && (
            <div className="flex items-center space-x-1 ml-2">
              <div className="text-xs text-gray-400">
                {currentSection + 1}/{sections.length}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sections Container */}
      <div 
        className="flex h-full w-full transition-transform duration-700 ease-in-out relative z-10"
        style={{ transform: `translateX(-${currentSection * 100}%)` }}
      >
        {/* Hero Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8 relative">
          <div className="text-center space-y-8 max-w-4xl w-full relative z-20">
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-4 tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    Harsh
                  </span>
                  <br />
                  <span className="text-white/90">Choudhary</span>
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur opacity-20 animate-pulse"></div>
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
                Computer Science Student & 
                <span className="text-cyan-400 font-semibold"> Full-Stack Developer</span>
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 text-gray-300 px-4">
              <ContactInfo icon={<Mail size={20} />} text="harshchoudhary227@gmail.com" />
              <ContactInfo icon={<MapPin size={20} />} text="Noida, Uttar Pradesh" />
            </div>
            
            <div className="flex justify-center space-x-8">
              <SocialLink href="https://github.com/Harsh-Choudhary-21" icon={<Github size={32} />} label="GitHub" />
              <SocialLink href="https://www.linkedin.com/in/harsh-choudhary-b87837311/" icon={<Linkedin size={32} />} label="LinkedIn" />
              <SocialLink href="https://leetcode.com/u/g3m0n_21/" icon={<Code2 size={32} />} label="LeetCode" />
              <SocialLink href="https://www.hackerrank.com/profile/harshchoudhary26" icon={<Trophy size={32} />} label="HackerRank" />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
              <DownloadCVButton />
              <ContactMeButton />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-6xl text-left space-y-8 w-full">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Who I Am</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  I'm a passionate <strong className="text-white">Computer Science student</strong> pursuing my B.Tech degree with a deep love for technology and innovation. My journey in programming started with curiosity and has evolved into expertise across multiple domains.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I specialize in <strong className="text-cyan-400">full-stack development</strong>, <strong className="text-cyan-400">machine learning</strong>, and <strong className="text-cyan-400">artificial intelligence</strong>, always eager to tackle complex challenges and create meaningful solutions.
                </p>
              </div>
              
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">What I Do</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-semibold">Full-Stack Development</h4>
                      <p className="text-gray-400 text-sm">Building responsive web applications with modern frameworks</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-semibold">AI & Machine Learning</h4>
                      <p className="text-gray-400 text-sm">Creating intelligent systems and data-driven solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="text-white font-semibold">Problem Solving</h4>
                      <p className="text-gray-400 text-sm">Competitive programming and algorithmic challenges</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-6xl w-full space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
              <SkillCategory 
                title="Technical Skills" 
                skills={[
                  { name: 'Python', level: 90 },
                  { name: 'C++', level: 85 },
                  { name: 'React.js', level: 80 },
                  { name: 'Node.js', level: 75 },
                  { name: 'MySQL', level: 80 },
                  { name: 'Machine Learning', level: 70 }
                ]}
                color="cyan"
              />
              <SkillCategory 
                title="Soft Skills" 
                skills={[
                  { name: 'Team Leadership', level: 85 },
                  { name: 'Problem Solving', level: 90 },
                  { name: 'Communication', level: 80 },
                  { name: 'Project Management', level: 75 },
                  { name: 'Time Management', level: 85 },
                  { name: 'Adaptability', level: 88 }
                ]}
                color="purple"
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="max-w-5xl w-full space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Education Journey
            </h2>
            <div className="space-y-8 px-4">
              <Education
                degree="B.Tech in Computer Science"
                school="ABESIT, Ghaziabad"
                date="Expected Sep 2028"
                highlights={[
                  'Active participant in multiple hackathons including HackWithMAIT, IEEE BVCOE, and HackWithIndia',
                  'Developed innovative projects: Full Stack Web Applications, AI Attendance System, Face Detection App',
                  'Attended prestigious seminars: BECon at IIT Delhi, CodeHunt at Microsoft',
                  'Maintaining strong academic performance while pursuing practical projects'
                ]}
                icon="🎓"
              />
              <Education
                degree="High School Diploma"
                school="GD Goenka Public School, Ghaziabad"
                date="May 2024"
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
          <div className="max-w-6xl w-full space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
              <ProjectCard
                title="AI-Based Face Recognition Attendance System"
                tech={['Python', 'OpenCV', 'Machine Learning']}
                description="Advanced attendance tracking system using facial recognition technology with real-time processing capabilities and secure data management."
                image="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop"
                gradient="from-blue-500 to-purple-600"
              />
              <ProjectCard
                title="Full Stack Web Application"
                tech={['React', 'Node.js', 'MongoDB']}
                description="Complete web application featuring modern UI/UX design, robust backend architecture, and seamless user experience."
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop"
                gradient="from-green-500 to-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Project Links Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-6xl w-full space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Project Showcase
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              <ProjectLinkCard
                title="Portfolio Website"
                description="This responsive portfolio built with React, TypeScript, and enhanced with 3D elements"
                link="https://github.com/Harsh-Choudhary-21"
                tech="React, TypeScript, Tailwind, Spline"
                color="cyan"
              />
              <ProjectLinkCard
                title="AI Face Recognition"
                description="Machine learning project for automated attendance tracking with high accuracy"
                link="https://github.com/Harsh-Choudhary-21"
                tech="Python, OpenCV, ML"
                color="purple"
              />
              <ProjectLinkCard
                title="Full Stack Web App"
                description="Complete CRUD application with authentication and modern design patterns"
                link="https://github.com/Harsh-Choudhary-21"
                tech="MERN Stack"
                color="blue"
              />
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-5xl w-full space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Certifications & Achievements
            </h2>
            <div className="glass-card p-8 mx-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CertificationCard 
                  title="HackerRank: SQL (Basic)" 
                  icon="🗄️"
                  description="Database management and query optimization"
                />
                <CertificationCard 
                  title="HackerRank: Python Programming" 
                  icon="🐍"
                  description="Advanced Python programming concepts"
                />
                <CertificationCard 
                  title="HackerRank: Problem Solving" 
                  icon="🧩"
                  description="Data structures and algorithms in C++ and Python"
                />
                <CertificationCard 
                  title="Software Engineer Intern Certificate" 
                  icon="💼"
                  description="Professional development and industry practices"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="max-w-4xl text-center space-y-8 w-full">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="glass-card p-12 mx-4">
              <div className="space-y-8">
                <p className="text-xl text-gray-300 leading-relaxed">
                  I'm always excited to collaborate on innovative projects and explore new opportunities. 
                  Whether you're looking for a dedicated developer or want to discuss technology, let's connect!
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                  <div className="space-y-4">
                    <h3 className="text-cyan-400 font-semibold text-lg">Languages</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span>Hindi (Native)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                        <span>English (Proficient - C2)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-purple-400 font-semibold text-lg">Availability</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        <span>Open to Opportunities</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></span>
                        <span>Remote & On-site</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
                  <ContactMeButton />
                  <DownloadCVButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Indicator */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50 text-white navigation-element">
        <div className="bg-black/40 backdrop-blur-md rounded-lg px-4 py-3 border border-white/10">
          <div className="text-xs opacity-70">
            {currentSection + 1} / {sections.length}
          </div>
          <div className="text-lg font-semibold capitalize bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {sections[currentSection].replace('-', ' ')}
          </div>
        </div>
      </div>
    </div>
  )
}

// Components
function ContactInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-3 hover:text-cyan-400 transition-colors duration-300 group">
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-base">{text}</span>
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
      <div className="text-gray-400 hover:text-cyan-400 transform hover:scale-125 transition-all duration-300 hover:drop-shadow-lg hover:drop-shadow-cyan-400/50 group-hover:animate-pulse">
        {icon}
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
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
      className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 text-lg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <Download size={20} />
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
      className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-full font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 text-lg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <Mail size={20} />
      <span className="relative z-10">Contact Me</span>
    </a>
  )
}

function SkillCategory({ title, skills, color }: { 
  title: string; 
  skills: { name: string; level: number }[];
  color: string;
}) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    purple: 'from-purple-500 to-pink-600',
  }

  return (
    <div className="glass-card p-8 group">
      <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} bg-clip-text text-transparent`}>
        {title}
      </h3>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">{skill.name}</span>
              <span className="text-gray-400 text-sm">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Education({ degree, school, date, highlights, icon }: {
  degree: string;
  school: string;
  date: string;
  highlights: string[];
  icon: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-card p-8 group">
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start space-x-4 mb-4">
          <div className="text-3xl">{icon}</div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
              {degree}
            </h3>
            <div className="text-gray-400 text-lg mt-1">{school} • {date}</div>
          </div>
        </div>
        
        <div className={`transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-20 opacity-70'
        } overflow-hidden`}>
          <ul className="space-y-3 text-gray-300">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start space-x-3 hover:text-cyan-400 transition-colors duration-300">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-cyan-400 text-sm mt-4 group-hover:underline flex items-center space-x-2">
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ title, tech, description, image, gradient }: { 
  title: string; 
  tech: string[]; 
  description: string;
  image: string;
  gradient: string;
}) {
  return (
    <div className="glass-card overflow-hidden group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60`} />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-white/10 text-cyan-400 rounded-full text-xs font-medium"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function ProjectLinkCard({ title, description, link, tech, color }: { 
  title: string; 
  description: string; 
  link: string; 
  tech: string;
  color: string;
}) {
  const colorClasses = {
    cyan: 'hover:border-cyan-400 hover:shadow-cyan-400/20',
    purple: 'hover:border-purple-400 hover:shadow-purple-400/20',
    blue: 'hover:border-blue-400 hover:shadow-blue-400/20',
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`glass-card p-6 group transition-all duration-300 ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>
        <ExternalLink size={18} className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300 group-hover:scale-110" />
      </div>
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{description}</p>
      <p className="text-cyan-400 text-xs font-medium bg-cyan-400/10 px-3 py-1 rounded-full inline-block">
        {tech}
      </p>
    </a>
  )
}

function CertificationCard({ title, icon, description }: { 
  title: string; 
  icon: string;
  description: string;
}) {
  return (
    <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-white/10">
      <div className="flex items-start space-x-4">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-2">{title}</h4>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></div>
      </div>
    </div>
  )
}

export default App