import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { GlassCard } from './UI'

export function TimelineItem({ type, title, organization, period, description, highlights, icon }: {
  type: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
  icon: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <GlassCard className="p-3 md:p-6 group">
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start space-x-2 md:space-x-4 mb-3 md:mb-4">
          <div className="text-xl md:text-2xl xl:text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 p-2 md:p-3 rounded-xl flex-shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-xl xl:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 break-words">
              {title}
            </h3>
            <div className="text-gray-400 text-sm md:text-base lg:text-lg mt-1 font-medium break-words">{organization}</div>
            <div className="text-cyan-400 text-xs md:text-sm lg:text-base mt-1 font-semibold">{period}</div>
            <p className="text-gray-300 mt-2 md:mt-3 text-xs md:text-sm lg:text-base leading-relaxed break-words">{description}</p>
          </div>
        </div>
        
        <div className={`transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <ul className="space-y-2 md:space-y-3 text-gray-300 ml-2 md:ml-8">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start space-x-2 hover:text-cyan-400 transition-colors duration-300">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full mt-1 md:mt-2 flex-shrink-0"></div>
                <span className="leading-relaxed text-xs md:text-sm">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-cyan-400 font-medium mt-3 md:mt-6 group-hover:underline flex items-center space-x-1 md:space-x-2 ml-12 md:ml-20">
          <span className="text-xs md:text-sm">{isExpanded ? 'Show less' : 'Show more details'}</span>
          <ChevronDown className={`w-3 h-3 md:w-5 md:h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
    </GlassCard>
  )
}

export function FactItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2 md:space-x-3">
      <span className="text-sm md:text-lg xl:text-xl flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <div className="text-gray-400 text-xs md:text-sm">{label}</div>
        <div className="text-white font-semibold text-xs md:text-sm lg:text-base break-words">{value}</div>
      </div>
    </div>
  )
}