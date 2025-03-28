"use client"

import { useRef } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface CurrentStartupProps {
  dictionary: {
    title: string
    subtitle: string
    description: string
  }
}

export function CurrentStartup({ dictionary }: CurrentStartupProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
      src: "/fridge-photos/ventia_team.JPG",
      alt: "Ventia Team Photo",
      width: 220,
      height: 160,
      position: { top: "25%", left: "25%" },
      rotate: 5,
    },
    {
      id: 3,
      type: "photo",
      src: "/fridge-photos/microsoft_colab.jpeg",
      alt: "Microsoft Collaboration",
      width: 180,
      height: 120,
      position: { top: "20%", right: "15%" },
      rotate: -8,
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
    },
    {
      id: 6,
      type: "photo",
      src: "/fridge-photos/miami_techweek.JPG",
      alt: "Miami Tech Week",
      width: 160,
      height: 110,
      position: { bottom: "10%", right: "15%" },
      rotate: 12,
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
    },
    {
      id: 9,
      type: "photo",
      src: "/fridge-photos/me_coding.jpeg",
      alt: "Coding Session",
      width: 170,
      height: 120,
      position: { bottom: "35%", left: "38%" },
      rotate: -3,
    }
  ]

  return (
    <section id="current-startup" className="py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div
          ref={sectionRef}
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">{dictionary.title}</h2>
          <p className="text-xl text-accent-foreground mb-2">{dictionary.subtitle}</p>
          <p className="text-lg text-muted-foreground">{dictionary.description}</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8"
          >
            <button className="bg-accent text-accent-foreground hover:bg-accent/90 py-3 px-6 rounded-md shadow-md font-medium flex items-center mx-auto group transition-all duration-300">
              <span>Learn about our journey</span>
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

        <div className="relative">
          <motion.div 
            ref={fridgeRef}
            className="relative bg-muted rounded-lg shadow-xl mx-auto aspect-[4/3] max-w-4xl"
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
            
            {/* Fridge Items */}
            {fridgeItems.map((item) => (
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
                {...(item.type === "photo" ? {
                  whileHover: { 
                    scale: 1.08, 
                    rotate: item.rotate / 2,
                    zIndex: 50,
                  },
                  whileTap: { 
                    scale: 0.95, 
                    rotate: item.rotate * 1.5,
                  },
                  drag: true,
                  dragConstraints: fridgeRef,
                  dragElastic: 0.1,
                  dragTransition: { bounceStiffness: 500, bounceDamping: 20 }
                } : {})}
              >
                <div 
                  className={`
                    relative overflow-hidden shadow-md
                    ${item.type === "photo" ? "border-4 border-white" : ""}
                    ${item.type === "sticker" ? "rounded-md" : ""}
                  `}
                  style={{
                    width: item.width,
                    height: item.height,
                    ...(item.type === "sticker" ? {
                    } : {})
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
                {item.type === "sticker" && (
                  <></>
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
              <p className="font-playfair text-sm text-gray-700 leading-tight">
                Building a CRM for LATAM consultative sales teams
                <br /><br />
                — Agustín
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 