import React, { useState } from 'react'
import { Github, Linkedin, Mail, Phone, MapPin, Download } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header/Introduction */}
        <header className="text-center space-y-4 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl font-bold text-white">Harsh Choudhary</h1>
          <div className="flex justify-center space-x-6 text-gray-300">
            <ContactInfo icon={<Phone size={18} />} text="+91 7428614005" />
            <ContactInfo icon={<Mail size={18} />} text="harshchoudhary227@gmail.com" />
            <ContactInfo icon={<MapPin size={18} />} text="Noida, Uttar Pradesh" />
          </div>
          <div className="flex justify-center space-x-4 items-center">
            <SocialLink href="https://github.com/Harsh-Choudhary-21" icon={<Github size={24} />} />
            <SocialLink href="https://www.linkedin.com/in/harsh-choudhary-b87837311/" icon={<Linkedin size={24} />} />
            <DownloadCVButton />
          </div>
        </header>

        {/* Summary */}
        <Section title="Summary">
          <p className="text-gray-300">
            Motivated student with strong communication and interpersonal skills, seeking to apply programming expertise in Python and C++ within a dynamic professional environment. Demonstrated ability to collaborate effectively in team settings while tackling complex challenges.
          </p>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkillCategory title="Technical" skills={['Python', 'C++', 'Node.js', 'MySQL', 'Data structures and algorithms', 'Networking']} />
            <SkillCategory title="Soft Skills" skills={['Team building', 'Organizational skills', 'Remote collaboration', 'Time management']} />
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          <div className="space-y-6">
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
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              title="AI-Based Face Recognition Attendance System"
              tech="Python/OpenCV"
            />
            <ProjectCard
              title="Text to Face Generation"
              tech="Python, MediaPipe"
            />
            <ProjectCard
              title="Full Stack Developer Project"
              tech="React, Node.js"
            />
          </div>
        </Section>

        {/* Certifications */}
        <Section title="Certifications">
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>HackerRank: SQL (Basic)</li>
            <li>HackerRank: Python Programming</li>
            <li>HackerRank: Problem Solving (C++ and Python)</li>
            <li>Software Engineer Intern Certificate from HackerRank</li>
          </ul>
        </Section>

        {/* Languages */}
        <Section title="Languages">
          <div className="flex space-x-4 text-gray-300">
            <span>Hindi (Native)</span>
            <span>•</span>
            <span>English (Proficient - C2)</span>
          </div>
        </Section>
      </div>
    </div>
  )
}

// Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      className={`bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm transform transition-all duration-300 ${
        isHovered ? 'scale-[1.02] shadow-xl shadow-blue-500/20' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      {children}
    </section>
  )
}

function ContactInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300">
      {icon}
      <span>{text}</span>
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
      href="/Harsh_Choudhary_Resume.docx"
      download="Harsh_Choudhary_Resume.docx"
      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <Download size={20} />
      <span>Download CV</span>
    </a>
  )
}

function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm hover:bg-blue-600/40 hover:scale-110 transform transition-all duration-300"
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
    <div 
      className="cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors duration-300">{degree}</h3>
      <div className="text-gray-400">{school} • {date}</div>
      <ul className={`mt-2 list-disc list-inside text-gray-300 space-y-1 transition-all duration-300 ${
        isExpanded ? 'opacity-100 max-h-96' : 'opacity-70 max-h-20 overflow-hidden'
      }`}>
        {highlights.map((highlight) => (
          <li key={highlight} className="hover:text-blue-400 transition-colors duration-300">{highlight}</li>
        ))}
      </ul>
      <div className="text-blue-400 text-sm mt-2 group-hover:underline">
        {isExpanded ? 'Show less' : 'Show more'}
      </div>
    </div>
  )
}

function ProjectCard({ title, tech }: { title: string; tech: string }) {
  return (
    <div className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="text-blue-400 text-sm mt-1">{tech}</p>
    </div>
  )
}

export default App