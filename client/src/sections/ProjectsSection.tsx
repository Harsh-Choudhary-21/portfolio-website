import React from 'react'
import { Briefcase } from 'lucide-react'
import { SectionHeader } from '../components/UI'
import { ProjectCard } from '../components/ProjectsComponents'

export function ProjectsSection() {
  const projects = [
    {
      title: "AI Face Recognition System",
      tech: ['Python', 'OpenCV', 'Machine Learning', 'TensorFlow'],
      description: "Advanced attendance tracking system using facial recognition technology with real-time processing capabilities and secure data management.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
      gradient: "from-blue-500 to-purple-600",
      link: "https://github.com/Harsh-Choudhary-21"
    },
    {
      title: "Full Stack Web Application",
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      description: "Complete web application featuring modern UI/UX design, robust backend architecture, and seamless user experience with authentication.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      gradient: "from-green-500 to-teal-600",
      link: "https://github.com/Harsh-Choudhary-21"
    },
    {
      title: "Interactive Portfolio",
      tech: ['React', 'TypeScript', 'Tailwind', 'Vanta.js'],
      description: "This responsive portfolio built with modern technologies and enhanced with animated 3D backgrounds for an immersive user experience.",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
      gradient: "from-purple-500 to-pink-600",
      link: "https://github.com/Harsh-Choudhary-21"
    }
  ]

  return (
    <div className="max-w-7xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
      <SectionHeader icon={<Briefcase size={32} className="md:w-12 md:h-12" />} title="Featured Projects" subtitle="What I've built" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 px-2 md:px-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  )
}