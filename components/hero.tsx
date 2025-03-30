"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { useInView } from "react-intersection-observer"

interface HeroProps {
  dictionary: {
    title: string
    subtitle: string
    cta: string
    scrollDown: string
  }
}

export function Hero({ dictionary }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    setIsLoaded(true)
    
    // Delay video loading to prioritize other content
    const timer = setTimeout(() => {
      setShouldLoadVideo(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/optimized/webp/video-poster.webp"
          className="h-full w-full object-cover md:object-center sm:object-center object-[28%_center]"
          onLoadedData={() => setVideoLoaded(true)}
          onError={(e) => console.error('Error loading video:', e)}
        >
          {shouldLoadVideo && (
            <>
              {/* Responsive video sources by device size */}
              <source
                media="(min-width: 768px)"
                src="https://pub-5a9058a81ff94bd694f7299087e254c9.r2.dev/background_video.webm"
                type="video/webm"
              />
              <source
                media="(min-width: 768px)"
                src="https://pub-5a9058a81ff94bd694f7299087e254c9.r2.dev/background_video.mp4"
                type="video/mp4"
              />
              <source
                src="https://pub-5a9058a81ff94bd694f7299087e254c9.r2.dev/background_video_mobile.mp4"
                type="video/mp4"
              />
              <source src="/background_video.mp4" type="video/mp4" />
            </>
          )}
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay for better text visibility */}
      </div>

      {/* Content */}
      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white"
      >
        <div className={`max-w-4xl ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {dictionary.title}
          </h1>
          <p className="mb-8 text-lg sm:text-xl md:text-2xl">{dictionary.subtitle}</p>
          
          {/* SF Visit - High Contrast Version */}
          <div className={`mb-8 ${inView ? "animate-fade-in delay-200" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/50 to-indigo-500/40 rounded-md border border-blue-400/50 shadow-sm hover:shadow-blue-500/30 hover:border-blue-300/60 transition-all duration-300">
              <span className="text-white font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Visiting San Francisco in April and May
              </span>
            </div>
          </div>
          
          <Button
            size="lg"
            className={`bg-white px-8 text-lg font-semibold text-black hover:bg-white/90 ${
              inView ? "animate-scale delay-300" : "opacity-0"
            }`}
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            {dictionary.cta}
          </Button>
        </div>

        {/* Scroll down indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transform ${
            isLoaded ? "animate-fade-in delay-500" : "opacity-0"
          }`}
        >
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center text-white hover:bg-white/10"
            onClick={() => {
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <span className="mb-2 text-sm">{dictionary.scrollDown}</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  )
}

