import React from 'react'
import { Award, Trophy } from 'lucide-react'
import { SectionHeader, GlassCard } from '../components/UI'
import { CertificationCard, AchievementCard } from '../components/ProjectsComponents'

export function AchievementsSection() {
  return (
    <div className="max-w-6xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
      <SectionHeader icon={<Award size={32} className="md:w-12 md:h-12" />} title="Achievements & Certifications" subtitle="Recognition of my work" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-2 md:px-4">
        <GlassCard className="p-4 md:p-8">
          <h3 className="text-lg md:text-2xl font-bold text-yellow-400 mb-4 md:mb-8 flex items-center space-x-2 md:space-x-3">
            <Trophy size={20} className="md:w-7 md:h-7" />
            <span>Legacy Certifications</span>
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
  )
}