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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Grid Gallery Background */}
      <div className="absolute inset-0 z-0 image-overlay">
        <div className="grid-gallery h-full w-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img
                src={`/placeholder.svg?height=300&width=300&text=Project+${i + 1}`}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
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

