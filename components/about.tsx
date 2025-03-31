"use client"

import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface AboutProps {
  dictionary: {
    title: string
    subtitle: string
    content: string
    cta: string
  }
}

export function About({ dictionary }: AboutProps) {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: 300,
  })

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div
            ref={sectionRef}
            className={`flex flex-col justify-center ${sectionInView ? "animate-slide-in-left" : "opacity-0"}`}
          >
            <h2 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">{dictionary.title}</h2>
            <p className="mb-6 text-xl font-medium text-accent-foreground">{dictionary.subtitle}</p>
            <p className="mb-8 text-lg text-muted-foreground">{dictionary.content}</p>
            {/* <Button className="group w-fit" variant="outline">
              {dictionary.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button> */}
          </div>
          <div ref={imageRef} className={`relative ${imageInView ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/optimized/webp/agustin_photo.webp"
                alt="Agustin Suarez Merino"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-blue-200" />
            <div className="absolute -right-6 -top-6 h-24 w-24 bg-blue-200" />
          </div>
        </div>
      </div>
    </section>
  )
}

