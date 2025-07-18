import React from 'react'
import { Code2 } from 'lucide-react'
import { SectionHeader } from '../components/UI'
import { FlipSkillCategory } from '../components/SkillsComponents'

export function SkillsSection() {
  return (
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
  )
}