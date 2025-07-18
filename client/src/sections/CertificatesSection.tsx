import React from 'react'
import { FileText } from 'lucide-react'
import { SectionHeader } from '../components/UI'
import { CertificateCard } from '../components/ProjectsComponents'

export function CertificatesSection() {
  const certificates = [
    {
      title: "Basics of Data Structures and Algorithms",
      platform: "Simplilearn",
      date: "15th January 2025",
      link: "https://simpli-web.app.link/e/rQrlIgWN6Ub",
      icon: "🧮",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Problem Solving (Basic)",
      platform: "HackerRank",
      date: null,
      link: "https://www.hackerrank.com/certificates/ec7dac2c4545",
      icon: "🧩",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Software Engineering Intern",
      platform: "HackerRank",
      date: null,
      link: "https://www.hackerrank.com/certificates/351e6d2b3111",
      icon: "💼",
      color: "from-purple-500 to-violet-600"
    },
    {
      title: "Python (Basic)",
      platform: "HackerRank",
      date: null,
      link: "https://www.hackerrank.com/certificates/831bd087d685",
      icon: "🐍",
      color: "from-yellow-500 to-orange-600"
    },
    {
      title: "SQL (Basic)",
      platform: "HackerRank",
      date: null,
      link: "https://www.hackerrank.com/certificates/419026435d88",
      icon: "🗄️",
      color: "from-pink-500 to-rose-600"
    }
  ]

  return (
    <div className="max-w-7xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
      <SectionHeader icon={<FileText size={32} className="md:w-12 md:h-12" />} title="Certificates" subtitle="Professional certifications and achievements" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 px-2 md:px-4">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.title} {...certificate} />
        ))}
      </div>
    </div>
  )
}