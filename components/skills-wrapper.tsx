"use client"

import dynamic from 'next/dynamic'

// Client-only import with no SSR
const SkillsClient = dynamic(() => import('@/components/skills-client'), { ssr: false })

interface SkillsWrapperProps {
  dictionary: {
    title: string
    categories: {
      name: string
      skills: string[]
    }[]
  }
}

export function SkillsWrapper({ dictionary }: SkillsWrapperProps) {
  return <SkillsClient dictionary={dictionary} />
} 