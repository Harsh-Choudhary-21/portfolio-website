import React from 'react'
import { GraduationCap } from 'lucide-react'
import { SectionHeader } from '../components/UI'
import { TimelineItem } from '../components/ExperienceComponents'

export function ExperienceSection() {
  return (
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
  )
}