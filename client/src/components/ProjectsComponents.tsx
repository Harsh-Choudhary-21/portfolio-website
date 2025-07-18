import React from 'react'
import { ExternalLink, Trophy, Sparkles, Award, Calendar } from 'lucide-react'
import { GlassCard } from './UI'

export function ProjectCard({ title, tech, description, image, gradient, link }: { 
  title: string; 
  tech: string[]; 
  description: string;
  image: string;
  gradient: string;
  link: string;
}) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group">
      <GlassCard className="overflow-hidden cursor-pointer h-full">
        <div className="relative h-32 md:h-40 xl:h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop';
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60`} />
          <div className="absolute top-2 right-2">
            <ExternalLink size={16} className="md:w-5 md:h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        <div className="p-3 md:p-6 space-y-2 md:space-y-4">
          <h3 className="text-sm md:text-lg xl:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 break-words">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-white/10 text-cyan-400 rounded-full text-xs md:text-sm font-medium border border-cyan-400/30 break-words"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-gray-300 leading-relaxed text-xs md:text-sm lg:text-base break-words">{description}</p>
        </div>
      </GlassCard>
    </a>
  )
}

export function CertificationCard({ title, icon, description, issuer }: { 
  title: string; 
  icon: string;
  description: string;
  issuer: string;
}) {
  return (
    <div className="bg-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 border border-white/20 group">
      <div className="flex items-start space-x-2 md:space-x-3">
        <div className="text-lg md:text-2xl xl:text-3xl bg-gradient-to-r from-yellow-400 to-orange-500 p-2 md:p-3 rounded-xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm md:text-base lg:text-lg mb-1 md:mb-2 group-hover:text-yellow-400 transition-colors duration-300 break-words">{title}</h4>
          <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2 break-words">{description}</p>
          <p className="text-yellow-400 text-xs md:text-sm font-semibold break-words">{issuer}</p>
        </div>
        <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></div>
      </div>
    </div>
  )
}

export function AchievementCard({ title, description, year, icon }: { 
  title: string; 
  description: string;
  year: string;
  icon: string;
}) {
  return (
    <div className="bg-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 border border-white/20 group">
      <div className="flex items-start space-x-2 md:space-x-3">
        <div className="text-lg md:text-2xl xl:text-3xl bg-gradient-to-r from-green-400 to-blue-500 p-2 md:p-3 rounded-xl flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm md:text-base lg:text-lg mb-1 md:mb-2 group-hover:text-green-400 transition-colors duration-300 break-words">{title}</h4>
          <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2 break-words">{description}</p>
          <p className="text-green-400 text-xs md:text-sm font-semibold">{year}</p>
        </div>
      </div>
    </div>
  )
}