import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NavigationProps {
  currentSection: number
  sections: string[]
  onNavigate: (index: number) => void
  onPrevious: () => void
  onNext: () => void
}

export function NavigationArrows({ currentSection, sections, onPrevious, onNext }: Pick<NavigationProps, 'currentSection' | 'sections' | 'onPrevious' | 'onNext'>) {
  return (
    <div className="fixed right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-3 md:space-y-4">
      <button
        onClick={onPrevious}
        disabled={currentSection === 0}
        className={`p-3 md:p-4 rounded-full backdrop-blur-sm border transition-all duration-300 ${
          currentSection === 0 
            ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed' 
            : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/40 hover:text-white active:scale-95'
        }`}
        aria-label="Previous section"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        onClick={onNext}
        disabled={currentSection === sections.length - 1}
        className={`p-3 md:p-4 rounded-full backdrop-blur-sm border transition-all duration-300 ${
          currentSection === sections.length - 1 
            ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed' 
            : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/40 hover:text-white active:scale-95'
        }`}
        aria-label="Next section"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>
    </div>
  )
}

export function NavigationDots({ currentSection, sections, onNavigate }: Pick<NavigationProps, 'currentSection' | 'sections' | 'onNavigate'>) {
  return (
    <div className="fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center space-x-3 md:space-x-4 bg-black/60 backdrop-blur-xl rounded-full px-6 md:px-8 py-3 md:py-4 border border-white/30 shadow-2xl">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`relative group transition-all duration-500 ${
              currentSection === index 
                ? 'w-10 md:w-12 h-3 md:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50' 
                : 'w-3 md:w-3 h-3 md:h-3 bg-gray-500 hover:bg-gray-300 rounded-full hover:scale-125'
            }`}
            aria-label={`Go to ${section} section`}
          >
            <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 md:px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap capitalize">
              {section}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function SectionIndicator({ currentSection, sections }: Pick<NavigationProps, 'currentSection' | 'sections'>) {
  return (
    <div className="fixed top-4 md:top-6 left-4 md:left-6 z-50 text-white">
      <div className="bg-black/60 backdrop-blur-xl rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-white/30 shadow-2xl">
        <div className="text-xs md:text-sm opacity-70 mb-1">
          {currentSection + 1} / {sections.length}
        </div>
        <div className="text-sm md:text-xl font-bold capitalize bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          {sections[currentSection].replace('-', ' ')}
        </div>
      </div>
    </div>
  )
}

export function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed right-4 md:right-6 top-4 md:top-6 z-50 hidden md:block">
      <div className="bg-black/60 backdrop-blur-xl rounded-full p-2 md:p-3 border border-white/30 shadow-2xl">
        <div className="relative w-12 h-12 md:w-16 md:h-16">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={`${progress * 100}, 100`}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs md:text-sm font-bold text-white">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}