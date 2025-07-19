import React, { useState } from 'react'
import { GlassCard } from './UI'

interface Skill {
  name: string
  level: number
  icon: string
  description: string
}

export function FlipSkillCategory({ title, skills, color }: { 
  title: string; 
  skills: Skill[];
  color: string;
}) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    purple: 'from-purple-500 to-pink-600',
  }

  return (
    <GlassCard className="p-3 md:p-6 group h-full">
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

function FlipSkillCard({ skill, color }: { skill: Skill; color: string }) {
  const [isFlipped, setIsFlipped] = useState(false)
  
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-600',
    purple: 'from-purple-500 to-pink-600',
  }

  return (
    <div 
      className="flip-card h-16 md:h-20 cursor-pointer w-full overflow-hidden"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front bg-white/10 rounded-xl border border-white/20 p-3 md:p-4 w-full h-full overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg md:text-xl">{skill.icon}</span>
              <span className="text-white font-semibold text-sm md:text-base truncate">{skill.name}</span>
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
        
        <div className="flip-card-back bg-white/15 rounded-xl border border-white/30 p-3 md:p-4 w-full h-full overflow-hidden">
          <div className="flex items-start space-x-2 h-full">
            <span className="text-lg md:text-xl flex-shrink-0">{skill.icon}</span>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm md:text-base mb-1 truncate">{skill.name}</h4>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed overflow-hidden">{skill.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}