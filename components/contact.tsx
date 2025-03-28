"use client"

import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Twitter, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ContactProps {
  dictionary: {
    title: string
    subtitle: string
    twitter: string
    instagram: string
    linkedin: string
    email: string
    viewResume: string
  }
}

export function Contact({ dictionary }: ContactProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="bg-accent py-20 md:py-32">
      <div ref={ref} className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className={`mb-12 text-center ${inView ? "animate-slide-up" : "opacity-0"}`}>
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-accent-foreground md:text-6xl">
              {dictionary.title}
            </h2>
            <p className="text-lg text-accent-foreground/80">{dictionary.subtitle}</p>
          </div>

          <div className={`flex flex-col items-center gap-6 ${inView ? "animate-slide-up delay-200" : "opacity-0"}`}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://twitter.com/agustincto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-accent-foreground transition-transform hover:scale-110"
              >
                <Twitter className="h-8 w-8" />
                <span className="sr-only">{dictionary.twitter}</span>
              </Link>

              <Link
                href="https://instagram.com/agustincto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-accent-foreground transition-transform hover:scale-110"
              >
                <Instagram className="h-8 w-8" />
                <span className="sr-only">{dictionary.instagram}</span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/agustinsuarezmerino"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-accent-foreground transition-transform hover:scale-110"
              >
                <Linkedin className="h-8 w-8" />
                <span className="sr-only">{dictionary.linkedin}</span>
              </Link>

            </div>

            <Link
              href="/Agustín Suárez Public CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="mt-8 bg-white text-accent-foreground hover:bg-white/90" size="lg">
                {dictionary.viewResume}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

