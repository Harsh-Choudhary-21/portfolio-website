import React from 'react'
import { Github, Linkedin, Code2, Trophy, Mail, MapPin, Phone } from 'lucide-react'

export function ContactInfo({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-2 md:space-x-4 hover:text-cyan-400 transition-colors duration-300 group bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-4 border border-white/20">
      <div className="group-hover:scale-110 transition-transform duration-300 text-cyan-400 flex-shrink-0">
        {icon}
      </div>
      <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium break-words min-w-0">{text}</span>
    </div>
  )
}

export function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative"
      aria-label={label}
    >
      <div className="text-gray-400 hover:text-cyan-400 transform hover:scale-125 transition-all duration-300 hover:drop-shadow-lg hover:drop-shadow-cyan-400/50 group-hover:animate-pulse bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-white/20 hover:border-cyan-400/50">
        {icon}
      </div>
      <div className="absolute -bottom-10 md:-bottom-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/20">
        {label}
      </div>
    </a>
  )
}

export function ContactDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2 md:space-x-4 p-2 md:p-4 bg-white/10 rounded-xl md:rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="text-cyan-400 flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-gray-400 text-xs md:text-sm">{label}</div>
        <div className="text-white font-semibold text-xs md:text-sm lg:text-base break-words">{value}</div>
      </div>
    </div>
  )
}

export function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-1 md:space-x-3 p-2 md:p-4 bg-white/10 rounded-xl md:rounded-2xl border border-white/20 hover:bg-white/15 hover:border-cyan-400/50 transition-all duration-300 group"
    >
      <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">{icon}</div>
      <span className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300 text-xs md:text-sm lg:text-base break-words">{label}</span>
    </a>
  )
}

export function LanguageItem({ language, level, proficiency }: { language: string; level: string; proficiency: number }) {
  return (
    <div className="space-y-1 md:space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold text-xs md:text-sm lg:text-base break-words">{language}</span>
        <span className="text-gray-400 text-xs md:text-sm flex-shrink-0">{level}</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-1.5 md:h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000"
          style={{ width: `${proficiency}%` }}
        />
      </div>
    </div>
  )
}