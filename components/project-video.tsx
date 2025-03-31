"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, ChevronDown } from "lucide-react"

interface ProjectVideoProps {
  videoUrl: string | null;
  thumbnailUrl: string;
  name: string;
}

export function ProjectVideo({ videoUrl, thumbnailUrl, name }: ProjectVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoExpanded, setVideoExpanded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Don't render video element if no videoUrl
  const hasVideo = videoUrl !== null && videoUrl !== '';

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Always render the component, using thumbnail as fallback
  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-xl border-4 border-white
        ${videoExpanded ? 'w-[500px]' : 'w-72'}`}
      style={{ transition: 'all 0.3s ease' }}
    >
      <div className="relative aspect-video">
        {/* Video overlay for thumbnail when not playing */}
        {(!isPlaying || !hasVideo) && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Image 
              src={thumbnailUrl || "/placeholder.svg"} 
              alt={name}
              fill
              className="object-cover"
            />
            {hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={togglePlayPause}
                  variant="secondary"
                  size="icon"
                  className="h-16 w-16 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary/90 transition-colors"
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            )}
          </div>
        )}
        
        {/* Only render video if there's a valid URL */}
        {hasVideo && (
          <video
            ref={videoRef}
            src={videoUrl || undefined}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            controls={isPlaying}
          />
        )}
        
        {/* Video expand/collapse button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm z-50"
          onClick={() => setVideoExpanded(!videoExpanded)}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${videoExpanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>
    </div>
  )
} 