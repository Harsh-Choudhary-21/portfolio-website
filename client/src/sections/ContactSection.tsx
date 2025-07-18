import React from 'react'
import { Mail, MapPin, Phone, Github, Linkedin, Code2, Trophy, Coffee } from 'lucide-react'
import { SectionHeader, GlassCard } from '../components/UI'
import { ContactDetail, LanguageItem, SocialButton } from '../components/ContactComponents'

export function ContactSection() {
  return (
    <div className="max-w-5xl w-full space-y-4 md:space-y-8 py-4 md:py-8">
      <SectionHeader icon={<Mail size={32} className="md:w-12 md:h-12" />} title="Let's Connect" subtitle="Ready to collaborate" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 px-2 md:px-4">
        <GlassCard className="p-6 md:p-10">
          <h3 className="text-xl md:text-3xl font-bold text-cyan-400 mb-4 md:mb-6">Get In Touch</h3>
          <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-4 md:mb-8">
            I'm always excited to collaborate on innovative projects and explore new opportunities. 
            Whether you're looking for a dedicated developer or want to discuss technology, let's connect!
          </p>
          
          <div className="space-y-3 md:space-y-6">
            <ContactDetail icon={<Mail size={18} className="md:w-6 md:h-6" />} label="Email" value="harshchoudhary227@gmail.com" />
            <ContactDetail icon={<MapPin size={18} className="md:w-6 md:h-6" />} label="Location" value="Noida, Uttar Pradesh" />
            <ContactDetail icon={<Phone size={18} className="md:w-6 md:h-6" />} label="Availability" value="Open to Opportunities" />
          </div>
        </GlassCard>
        
        <div className="space-y-3 md:space-y-6">
          <GlassCard className="p-4 md:p-8">
            <h3 className="text-lg md:text-2xl font-bold text-purple-400 mb-3 md:mb-6">Languages</h3>
            <div className="space-y-3 md:space-y-4">
              <LanguageItem language="Hindi" level="Native" proficiency={100} />
              <LanguageItem language="English" level="Proficient (C2)" proficiency={90} />
            </div>
          </GlassCard>
          
          <GlassCard className="p-4 md:p-8">
            <h3 className="text-lg md:text-2xl font-bold text-green-400 mb-3 md:mb-6">Connect With Me</h3>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <SocialButton href="https://github.com/Harsh-Choudhary-21" icon={<Github size={18} className="md:w-6 md:h-6" />} label="GitHub" />
              <SocialButton href="https://www.linkedin.com/in/harsh-choudhary-b87837311/" icon={<Linkedin size={18} className="md:w-6 md:h-6" />} label="LinkedIn" />
              <SocialButton href="https://leetcode.com/u/g3m0n_21/" icon={<Code2 size={18} className="md:w-6 md:h-6" />} label="LeetCode" />
              <SocialButton href="https://www.hackerrank.com/profile/harshchoudhary26" icon={<Trophy size={18} className="md:w-6 md:h-6" />} label="HackerRank" />
              <div className="col-span-2">
                <SocialButton href="https://coff.ee/harsh.choudhary" icon={<Coffee size={18} className="md:w-6 md:h-6" />} label="Buy me a coffee ☕" />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}