"use client"

import dynamic from 'next/dynamic'

// Client-only import with no SSR
const ProjectsClient = dynamic(
  () => import('./projects').then(mod => mod.Projects),
  { ssr: false }
)

interface ProjectsWrapperProps {
  dictionary: {
    title: string
    subtitle: string
    filterAll: string
    filterWork: string
    filterPersonal: string
    viewProject: string
    technology: string
    backToProjects: string
    projects?: any[]
    list?: any[]
  }
}

export function ProjectsWrapper({ dictionary }: ProjectsWrapperProps) {
  return <ProjectsClient dictionary={dictionary} />
} 