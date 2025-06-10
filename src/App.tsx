import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Phone, MapPin, Download, ChevronLeft, ChevronRight } from 'lucide-react'

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const sections = [
    'intro',
    'summary', 
    'skills',
    'education',
    'projects',
    'certifications',
    'languages'
  ]

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
    setTimeout(() => setIsTransitioning(false), 800)
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-black to-red-900 relative">
      {/* Navigation Dots */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 space-y-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-blue-400 scale-125' 
                : 'bg-gray-500 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-4">
        <button
          onClick={() => currentSection > 0 && navigateToSection(currentSection - 1)}
          disabled={currentSection === 0}
          className={`p-3 rounded-full transition-all duration-300 ${
            currentSection === 0 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-110'
          }`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => currentSection < sections.length - 1 && navigateToSection(currentSection + 1)}
          disabled={currentSection === sections.length - 1}
          className={`p-3 rounded-full transition-all duration-300 ${
            currentSection === sections.length - 1 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-110'
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Sections Container */}
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSection * 100}%)` }}
      >
        {/* Introduction Section */}
        <div className="min-w-full h-full flex items-center justify-center p-8">
          <div className="text-center space-y-8 max-w-4xl">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-bold text-white animate-pulse">
                Harsh Choudhary
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                Computer Science Student & Aspiring Software Developer
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-gray-300">
              <ContactInfo icon={<Phone size={20} />} text="+91 7428614005" />
              <ContactInfo icon={<Mail size={20} />} text="harshchoudhary227@gmail.com" />
              <ContactInfo icon={<MapPin size={20} />} text="Noida, Uttar Pradesh" />
            </div>
            
            <div className="flex justify-center space-x-6">
              <SocialLink href="https://github.com/Harsh-Choudhary-21" icon={<Github size={32} />} />
              <SocialLink href="https://www.linkedin.com/in/harsh-choudhary-b87837311/" icon={<Linkedin size={32} />} />
            </div>
            
            <DownloadCVButton />
          </div>
        </div>

        {/* Summary Section */}
        <div className="min-w-full h-full flex items-center justify-center p-8">
          <div className="max-w-4xl text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Summary</h2>
            <div className="bg-gray-800/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Motivated student with strong communication and interpersonal skills, seeking to apply programming expertise in Python and C++ within a dynamic professional environment. Demonstrated ability to collaborate effectively in team settings while tackling complex challenges.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="min-w-full h-full flex items-center justify-center p-8">
          <div className="max-w-6xl w-full space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-12">Skills</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SkillCategory 
                title="Technical" 
                skills={['Python', 'C++', 'Node.js', 'MySQL', 'Data structures and algorithms', 'Networking']} 
              />
              <SkillCategory 
                title="Soft Skills" 
                skills={['Team building', 'Organizational skills', 'Remote collaboration', 'Time management']} 
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="min-w-full h-full flex items-center justify-center p-8">
          <div className="max-w-5xl w-full space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-12">Education</h2>
            <div className="space-y-8">
              <Education
                degree="B.Tech in Computer Science"
                school="ABESIT, Ghaziabad"
                date="Expected Sep 2028"
                highlights={[
                  'Participated in multiple hackathons (HackWithMAIT, IEEE BVCOE, HackWithIndia)',
                  'Projects: Full Stack Web Developer, AI Attendance System, Face Detection App',
                  'Seminars: BECon at IIT Delhi, CodeHunt at Microsoft'
                ]}
              />
              <Education
                degree="High School Diploma"
                school="GD Goenka Public School, Ghaziabad"
                date="May 2024"
                highlights={[
                  'President of Tech Club',
                  'Runner-up in Tech Event "Harmony"',
                  'Video Editor for Cultural Events'
                ]}
              />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="min-w-full h-full flex items-center justify-center p-8">
          <div className="max-w-6xl w-full space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-12">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProjectCard
                title="AI-Based Face Recognition Attendance System"
                tech="Python/OpenCV"
                description="Advanced attendance tracking system using facial recognition technology"
              />
              <ProjectCard
                title="Full Stack Developer Project"
                tech="React, Node.js"
                description="Complete web application with modern frontend and robust backend"
              />
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="min-w-full h-full flex items-center justify-center p-8">
          <div className="max-w-4xl w-full space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-12">Certifications</h2>
            <div className="bg-gray-800/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CertificationCard title="HackerRank: SQL (Basic)" />
                <CertificationCard title="HackerRank: Python Programming" />
                <CertificationCard title="HackerRank: Problem Solving (C++ and Python)" />
                <CertificationCard title="Software Engineer Intern Certificate from HackerRank" />
              </div>
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="min-w-full h-full flex items-center justify-center p-8">
          <div className="max-w-4xl text-center space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-12">Languages</h2>
            <div className="bg-gray-800/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-2xl text-gray-300">
                <div className="flex items-center space-x-3">
                  <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                  <span>Hindi (Native)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                  <span>English (Proficient - C2)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Indicator */}
      <div className="fixed top-8 left-8 z-50 text-white">
        <div className="text-sm opacity-70">
          {currentSection + 1} / {sections.length}
        </div>
        <div className="text-lg font-semibold capitalize">
          {sections[currentSection]}
        </div>
      </div>
    </div>
  )
}

// Components
function ContactInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300">
      {icon}
      <span className="text-sm md:text-base">{text}</span>
    </div>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-400 transform hover:scale-125 transition-all duration-300"
    >
      {icon}
    </a>
  )
}

function DownloadCVButton() {
  return (
    <a
      href="https://docs.google.com/document/d/1p5kJmYtuBKdmO691Xsi8aZBPWptXph7n/edit?usp=sharing&ouid=103310832046668757715&rtpof=true&sd=true"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 via-black to-red-600 hover:from-blue-700 hover:via-gray-900 hover:to-red-700 text-white px-8 py-4 rounded-full font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
    >
      <Download size={24} />
      <span>Download CV</span>
    </a>
  )
}

function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
      <h3 className="text-2xl md:text-3xl font-medium text-white mb-6">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm md:text-base hover:bg-blue-600/40 hover:scale-110 transform transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function Education({ degree, school, date, highlights }: {
  degree: string;
  school: string;
  date: string;
  highlights: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
      <div 
        className="cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-2xl md:text-3xl font-medium text-white group-hover:text-blue-400 transition-colors duration-300">{degree}</h3>
        <div className="text-gray-400 text-lg mt-2">{school} • {date}</div>
        <ul className={`mt-4 list-disc list-inside text-gray-300 space-y-2 transition-all duration-300 ${
          isExpanded ? 'opacity-100 max-h-96' : 'opacity-70 max-h-20 overflow-hidden'
        }`}>
          {highlights.map((highlight) => (
            <li key={highlight} className="hover:text-blue-400 transition-colors duration-300 text-sm md:text-base">{highlight}</li>
          ))}
        </ul>
        <div className="text-blue-400 text-sm mt-3 group-hover:underline">
          {isExpanded ? 'Show less' : 'Show more'}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ title, tech, description }: { title: string; tech: string; description: string }) {
  return (
    <div className="bg-gray-800/50 rounded-2xl p-8 hover:bg-gray-700/50 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer backdrop-blur-sm">
      <h3 className="text-xl md:text-2xl font-medium text-white mb-3">{title}</h3>
      <p className="text-blue-400 text-sm md:text-base mb-4">{tech}</p>
      <p className="text-gray-300 text-sm md:text-base">{description}</p>
    </div>
  )
}

function CertificationCard({ title }: { title: string }) {
  return (
    <div className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-300 text-sm md:text-base">{title}</span>
      </div>
    </div>
  )
}

export default App