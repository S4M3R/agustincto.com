"use client"

import dynamic from 'next/dynamic'

// Client-only import with no SSR
const CurrentStartupClient = dynamic(
  () => import('./current-startup').then(mod => mod.CurrentStartup),
  { ssr: false }
)

interface CurrentStartupWrapperProps {
  dictionary: {
    title: string
    subtitle: string
    description: string
  }
}

export function CurrentStartupWrapper({ dictionary }: CurrentStartupWrapperProps) {
  return <CurrentStartupClient dictionary={dictionary} />
} 