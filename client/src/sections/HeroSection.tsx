import React from 'react'
import { Mail, MapPin, Github, Linkedin, Code2, Trophy, Coffee } from 'lucide-react'
import { ContactInfo, SocialLink } from '../components/ContactComponents'
import { DownloadCVButton, ContactMeButton } from '../components/UI'

export function HeroSection() {
  return (
    <div className="min-w-full h-full flex items-center justify-center p-3 md:p-8 relative overflow-y-auto">
      <div className="text-center space-y-4 md:space-y-8 max-w-6xl w-full relative z-20 py-4 md:py-8">
        <div className="space-y-4 md:space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 rounded-3xl blur-3xl"></div>
            <h1 className="relative text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-3 md:mb-6 tracking-tight break-words">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Harsh
              </span>
              <br />
              <span className="text-white/95 font-light">Choudhary</span>
            </h1>
          </div>
          
          <div className="space-y-2 md:space-y-4">
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl text-gray-200 max-w-4xl mx-auto px-2 md:px-4 leading-relaxed font-light break-words">
              Computer Science Student &
            </p>
            <p className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent break-words">
              AI-ML Enthusiast
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 max-w-2xl mx-auto text-gray-300 px-2">
          <ContactInfo icon={<Mail size={18} className="md:w-6 md:h-6" />} text="harshchoudhary227@gmail.com" />
          <ContactInfo icon={<MapPin size={18} className="md:w-6 md:h-6" />} text="Noida, Uttar Pradesh" />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          <SocialLink href="https://github.com/Harsh-Choudhary-21" icon={<Github size={20} className="md:w-7 md:h-7" />} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/harsh-choudhary-b87837311/" icon={<Linkedin size={20} className="md:w-7 md:h-7" />} label="LinkedIn" />
          <SocialLink href="https://leetcode.com/u/g3m0n_21/" icon={<Code2 size={20} className="md:w-7 md:h-7" />} label="LeetCode" />
          <SocialLink href="https://www.hackerrank.com/profile/harshchoudhary26" icon={<Trophy size={20} className="md:w-7 md:h-7" />} label="HackerRank" />
          <SocialLink href="https://coff.ee/harsh.choudhary" icon={<Coffee size={20} className="md:w-7 md:h-7" />} label="Buy me a coffee" />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 pt-4 md:pt-8">
          <DownloadCVButton />
          <ContactMeButton />
        </div>
      </div>
    </div>
  )
}