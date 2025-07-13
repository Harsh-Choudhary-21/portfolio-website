import React from 'react'
import { Download, Mail } from 'lucide-react'

export function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/8 md:bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/15 md:border-white/20 shadow-xl md:shadow-2xl hover:bg-white/10 md:hover:bg-white/15 transition-all duration-500 hover:scale-[1.01] md:hover:scale-[1.02] hover:shadow-cyan-500/10 md:hover:shadow-cyan-500/20 ${className}`}>
      {children}
    </div>
  )
}

export function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="text-center space-y-2 md:space-y-4">
      <div className="flex justify-center text-cyan-400 mb-2 md:mb-4">
        {icon}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent break-words">
        {title}
      </h2>
      <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-400 font-light break-words">{subtitle}</p>
    </div>
  )
}

export function DownloadCVButton() {
  return (
    <a
      href="https://docs.google.com/document/d/1p5kJmYtuBKdmO691Xsi8aZBPWptXph7n/edit?usp=sharing&ouid=103310832046668757715&rtpof=true&sd=true"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center space-x-2 md:space-x-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50 text-sm md:text-lg overflow-hidden border border-cyan-400/20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <Download size={18} className="md:w-6 md:h-6" />
      <span className="relative z-10">Download CV</span>
    </a>
  )
}

export function ContactMeButton() {
  return (
    <a
      href="https://mail.google.com/mail/?view=cm&fs=1&to=harshchoudhary227@gmail.com&su=Contact%20from%20Portfolio&body=Hi%20Harsh,%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch.%0A%0ABest%20regards"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center space-x-2 md:space-x-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50 text-sm md:text-lg overflow-hidden border border-purple-400/20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <Mail size={18} className="md:w-6 md:h-6" />
      <span className="relative z-10">Contact Me</span>
    </a>
  )
}