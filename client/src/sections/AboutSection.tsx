import React from 'react'
import { User, Sparkles } from 'lucide-react'
import { SectionHeader, GlassCard } from '../components/UI'
import { FactItem } from '../components/ExperienceComponents'

export function AboutSection() {
  return (
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
  )
}