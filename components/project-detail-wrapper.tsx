"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Import the ProjectDetail component with SSR disabled
const DynamicProjectDetail = dynamic(
  () => import("./project-detail"),
  { ssr: false }
)

interface ProjectDetailWrapperProps {
  project: {
    id: string
    name: string
    description: string
    videoUrl: string | null
    thumbnailUrl: string
    tags: string[]
    technologies: string[]
    links: Array<{ title: string; url: string }>
    items: Array<{
      id: number
      type: "sticker" | "note" | "image"
      src: string
      alt: string
      width: number
      height: number
      position: { top?: string; left?: string; right?: string; bottom?: string }
      rotate: number
    }>
  }
  dictionary: {
    viewProject: string
    technology: string
    backToProjects: string
  }
  onClose: () => void
}

// Default export for easier importing
export default function ProjectDetailWrapper(props: ProjectDetailWrapperProps) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DynamicProjectDetail {...props} />
    </Suspense>
  )
}

// Simple loading state that won't cause hydration mismatches
function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-background rounded-lg p-8 shadow-lg">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
        <p className="text-center text-muted-foreground">Loading project details...</p>
      </div>
    </div>
  )
} 