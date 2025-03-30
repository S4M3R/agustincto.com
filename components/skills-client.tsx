"use client"

import { useState, useEffect } from "react"
import { Skills } from "./skills"

interface SkillsClientProps {
  dictionary: {
    title: string
    categories: {
      name: string
      skills: string[]
    }[]
  }
}

export default function SkillsClient({ dictionary }: SkillsClientProps) {
  // Only render on client
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return (
      <div className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">{dictionary.title}</h2>
            <p className="text-muted-foreground mb-4">Loading skills...</p>
          </div>
        </div>
      </div>
    )
  }
  
  return <Skills dictionary={dictionary} />
} 