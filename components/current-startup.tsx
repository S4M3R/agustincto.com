"use client"

import { useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { X, ExternalLink } from "lucide-react"

interface CurrentStartupProps {
  dictionary: {
    chip?: string
    title: string
    subtitle: string
    description: string
    role?: string
    period?: string
    achievements?: string[]
    technologies?: string[]
    website?: string
  }
}

export function CurrentStartup({ dictionary }: CurrentStartupProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [showModal, setShowModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile on client-side
  useState(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  const fridgeRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: fridgeRef,
    offset: ["start end", "end start"],
  })
  
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.98])

  // Define the image items to display
  const fridgeItems = [
    // Keep essential items first (showing on both mobile and desktop)
    {
      id: 1,
      type: "sticker",
      src: "/logos/sticker_ventia.png",
      alt: "Ventia Logo",
      width: 140,
      height: 80,
      position: { top: "10%", left: "12%" },
      rotate: -15,
    },
    {
      id: 2,
      type: "photo",
      src: "/optimized/fridge-photos/ventia_team.jpg",
      alt: "Ventia Team Photo",
      width: 220,
      height: 160,
      position: { top: "25%", left: "25%" },
      rotate: 5,
    },
    {
      id: 6,
      type: "photo",
      src: "/optimized/fridge-photos/miami_techweek.jpg",
      alt: "Miami Tech Week",
      width: 160,
      height: 110,
      position: { bottom: "20%", right: "15%" },
      rotate: 12,
    },
    // Additional items for desktop only
    {
      id: 3,
      type: "photo",
      src: "/optimized/fridge-photos/microsoft_colab.jpg",
      alt: "Microsoft Collaboration",
      width: 180,
      height: 120,
      position: { top: "20%", right: "15%" },
      rotate: -8,
      desktopOnly: true,
    },
    {
      id: 4,
      type: "sticker",
      src: "/logos/sticker_endeavor_scaleup.png",
      alt: "Endeavor ScaleUp",
      width: 130,
      height: 75,
      position: { bottom: "25%", left: "18%" },
      rotate: 10,
      desktopOnly: true,
    },
    {
      id: 5,
      type: "sticker",
      src: "/logos/sticker_cubo.png",
      alt: "Cubo Innovation Program",
      width: 110,
      height: 70,
      position: { bottom: "35%", right: "20%" },
      rotate: -5,
      desktopOnly: true,
    },
    {
      id: 7,
      type: "sticker",
      src: "/logos/sticker_cie_ort.png",
      alt: "CIE ORT",
      width: 100,
      height: 60,
      position: { bottom: "15%", left: "40%" },
      rotate: -7,
      desktopOnly: true,
    },
    {
      id: 9,
      type: "photo",
      src: "/optimized/fridge-photos/me_coding.jpg",
      alt: "Coding Session",
      width: 170,
      height: 120,
      position: { bottom: "35%", left: "38%" },
      rotate: -3,
      desktopOnly: true,
    }
  ]

  // Filter items for mobile
  const displayedItems = isMobile
    ? fridgeItems.filter(item => {
        // Always include stickers and other non-photo items
        if (item.type !== "photo") return true;
        
        // For photos, limit to 3 specific ones for mobile
        return [2, 6, 9].includes(item.id); // These IDs are for the most important photos
      })
    : fridgeItems

  // Get tech icon path
  const getTechIconPath = (tech: string): string => {
    const techMap: Record<string, string> = {
      'next.js': '/techicons/nextjs.png',
      'node.js': '/techicons/nodejs.png',
      'express': '/techicons/express.png',
      'mongodb': '/techicons/MongoDB Logo.svg',
      'redux': '/techicons/redux.png',
      'react native': '/techicons/reactnative.svg',
      'react': '/techicons/React.png',
      'tailwind': '/techicons/Tailwind Logo.png',
      'aws': '/techicons/aws.png',
      'redis': '/techicons/redis.webp',
      'figma': '/techicons/figma.png',
    };
    
    // Try to match the tech name (case insensitive)
    const techLower = tech.toLowerCase();
    for (const [key, path] of Object.entries(techMap)) {
      if (techLower.includes(key)) {
        return path;
      }
    }
    
    // Default placeholder if no match
    return '/placeholder.svg';
  };

  return (
    <>
      <section id="current-startup" className="py-20 md:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div
            ref={sectionRef}
            className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
              sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* New content structure */}
            {dictionary.chip && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
              >
                {dictionary.chip}
              </motion.div>
            )}
            <h2 className="text-5xl font-bold tracking-tight md:text-6xl mb-3">{dictionary.title}</h2>
            <p className="text-xl text-accent-foreground mb-4">{dictionary.subtitle}</p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{dictionary.description}</p>
            
            {dictionary.technologies && dictionary.technologies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-3 mt-6 mb-8"
              >
                {dictionary.technologies.map((tech, index) => (
                  <div 
                    key={index+2} 
                    className="bg-white rounded-md p-2 shadow-sm hover:shadow-md transition-all duration-200 w-12 h-12 flex items-center justify-center"
                    title={tech}
                  >
                    <Image
                      src={getTechIconPath(tech)}
                      alt={tech}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          <div className="relative">
            <motion.div 
              ref={fridgeRef}
              className="relative bg-muted rounded-lg shadow-xl mx-auto aspect-[3/4] md:aspect-[4/3] max-w-3xl w-[85vw] md:w-auto"
              style={{ 
                rotate,
                scale 
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 90 }}
            >
              {/* Fridge Surface */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg border border-gray-300">
                {/* Subtle grid texture */}
                <div className="absolute inset-0 opacity-5" 
                  style={{
                    backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }}
                />
                
                {/* Fridge brand */}
                <div className="absolute top-4 left-4 text-gray-300 text-xs font-mono">
                  VENTIA FRIDGE™
                </div>
                
                {/* Some fridge scratches and marks for realism */}
                <div className="absolute w-20 h-[1px] bg-gray-400 opacity-20 rotate-45" style={{ top: "30%", left: "10%" }} />
                <div className="absolute w-12 h-[1px] bg-gray-400 opacity-20 rotate-[125deg]" style={{ top: "70%", right: "25%" }} />
                <div className="absolute w-1 h-10 bg-gray-300 opacity-30" style={{ top: "10%", right: "40%" }} />
              </div>
              
              {/* Fridge Handle */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-40 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full">
                {/* Handle reflection */}
                <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-r from-white to-transparent opacity-30 rounded-l-full" />
              </div>
              
              {/* Fridge Items - Filtered for mobile */}
              {displayedItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="absolute"
                  style={{
                    ...item.position,
                    zIndex: 10 + item.id,
                  }}
                  initial={{ opacity: 0, rotate: item.rotate * 2, scale: 0.8 }}
                  animate={sectionInView ? { 
                    opacity: 1, 
                    rotate: item.rotate,
                    scale: 1,
                  } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5 + (item.id * 0.15),
                    type: "spring",
                    stiffness: 100,
                    damping: 12
                  }}
                  {...(item.type === "photo" || item.type === "sticker" ? {
                    whileHover: { 
                      scale: 1.08, 
                      rotate: item.rotate / 2,
                      zIndex: 50,
                      cursor: "grab",
                    },
                    whileTap: { 
                      scale: 0.95, 
                      rotate: item.rotate * 1.5,
                      cursor: "grabbing",
                    },
                    drag: true,
                    dragConstraints: fridgeRef,
                    dragElastic: 0.1,
                    dragTransition: { bounceStiffness: 500, bounceDamping: 20 }
                  } : {})}
                >
                  <div 
                    className={`
                      relative overflow-hidden
                      ${item.type === "photo" ? "border-4 border-white shadow-md" : ""}
                      ${(item.type === "photo" || item.type === "sticker") ? "cursor-grab active:cursor-grabbing" : ""}
                    `}
                    style={{
                      width: item.width,
                      height: item.height,
                    }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className={`
                        ${item.type === "photo" ? "object-cover" : ""}
                        ${item.type === "sticker" ? "object-contain" : ""}
                      `}
                      sizes={`${Math.max(item.width, item.height)}px`}
                    />
                  </div>
                  {item.type === "photo" && (
                    <>
                      {/* Photo tape */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-6">
                        <div className="w-full h-full bg-white opacity-70 rounded-sm shadow-sm transform rotate-1"></div>
                      </div>
                      
                      {/* Photo shadow effect */}
                      <div 
                        className="absolute -z-10" 
                        style={{
                          width: item.width, 
                          height: item.height,
                          top: '8px',
                          left: '8px',
                          background: 'rgba(0,0,0,0.15)',
                          borderRadius: '2px',
                          filter: 'blur(10px)'
                        }}
                      ></div>
                    </>
                  )}
                </motion.div>
              ))}
              
              {/* Sticky note with quick message */}
              <motion.div
                className="absolute bottom-8 left-8 w-36 h-36 bg-yellow-100 rotate-6 p-3 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <p className="font-handwriting text-sm text-gray-700 leading-tight">
                  Building a CRM for LATAM consultative sales teams
                  <br /><br />
                  — Agustín
                </p>
              </motion.div>

              {/* Drag hint text */}
              <motion.div
                className="absolute top-4 right-4 text-xs text-gray-400 font-medium"
                initial={{ opacity: 0 }}
                animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 }}
              >
                Drag items to rearrange
              </motion.div>
            </motion.div>
          </div>
          
          {/* Move button to the bottom and update style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-12 text-center"
          >
            <button 
              onClick={() => setShowModal(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-8 rounded-md shadow-md font-medium flex items-center mx-auto group transition-all duration-300"
            >
              <span>View Ventia Journey</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* CV-like Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div 
            className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-auto max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            {/* Close button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background/60 z-10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Modal header with gradient background */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-8 px-8">
              <h2 className="text-3xl font-bold mb-2">{dictionary.title}</h2>
              <p className="text-xl opacity-90">{dictionary.subtitle}</p>
            </div>
            
            {/* Modal content */}
            <div className="p-8">
              {dictionary.role && dictionary.period && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{dictionary.role}</h3>
                  <p className="text-muted-foreground">{dictionary.period}</p>
                </div>
              )}
              
              {/* Achievements */}
              {dictionary.achievements && dictionary.achievements.length > 0 && (
                <div className="mb-8">
                  <ul className="space-y-3 list-disc pl-5">
                    {dictionary.achievements.map((achievement, index) => (
                      <li key={index} className="text-base">{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Tech stack */}
              {dictionary.technologies && dictionary.technologies.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {dictionary.technologies.map((tech, index) => (
                      <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 text-sm">
                        <div className="w-5 h-5 mr-2 rounded-full overflow-hidden bg-white flex items-center justify-center">
                          <Image
                            src={getTechIconPath(tech)}
                            alt={tech}
                            width={16}
                            height={16}
                            className="object-contain"
                          />
                        </div>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* CTA button for website */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center">
                <a 
                  href={`https://${dictionary.website || 'getventia.com'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 text-primary hover:bg-primary/20 py-2 px-4 rounded-md font-medium inline-flex items-center transition-colors"
                >
                  Visit Ventia Website
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
} 