"use client"

import { useMemo, useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import ProjectDetailWrapper from "./project-detail-wrapper"
import Image from "next/image"

interface Project {
  id: string
  name: string
  description: string
  image: string
  thumbnailUrl: string
  videoUrl: string | null
  technologies: string[]
  tags: string[]
  links: Array<{ title: string; url: string }>
  category: string
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

interface ProjectsProps {
  dictionary: {
    title: string
    subtitle: string
    filterAll: string
    filterWork: string
    filterPersonal: string
    viewProject: string
    technology: string
    backToProjects: string
    projects?: Project[]
    list?: any[]
  }
}

export function Projects({ dictionary }: ProjectsProps) {
  // Add state to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false)
  
  // Set mounted state on effect
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Convert the list items to projects if available
  const projects = useMemo(() => {
    if (dictionary.projects && dictionary.projects.length > 0) {
      return dictionary.projects;
    }
    
    // If list exists, map it to the Project format
    if (dictionary.list && dictionary.list.length > 0) {
      return dictionary.list.map((item, index) => {
        // Create a stable ID from the name
        const id = `project-${item.name.toLowerCase().replace(/\s+/g, '-')}`;
        
        return {
          id,
          name: item.name,
          description: item.description,
          image: "/placeholder.svg", // Use a placeholder to avoid 404s
          thumbnailUrl: item.thumbnailUrl || "/placeholder.svg",
          videoUrl: item.videoUrl || null, // Use null instead of empty string
          technologies: item.technologies || [],
          tags: [item.year],
          links: item.links || [],
          category: item.category || "personal",
          items: []
        };
      });
    }
    
    return [];
  }, [dictionary.projects, dictionary.list]);
  
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  
  // Use fixed ref object for initial server render
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    initialInView: false
  })

  const selectedProject = projects?.find(project => project.id === selectedProjectId)

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId)
  }

  const handleProjectClose = () => {
    setSelectedProjectId(null)
  }

  const filteredProjects = useMemo(() => {
    return activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects])

  // Get tech icon path for preview
  const getTechIconPath = (tech: string): string => {
    const techMap: Record<string, string> = {
      'react': '/techicons/React.png',
      'typescript': '/techicons/typescript.png',
      'javascript': '/techicons/javascript.png',
      'python': '/techicons/python.png',
      'nextjs': '/techicons/nextjs.png',
      'tailwind': '/techicons/Tailwind Logo.png',
      'shadcn': '/techicons/shadcn.png',
      'figma': '/techicons/figma.png',
      'git': '/techicons/git.png',
      'openai': '/techicons/openai.png',
      'langchain': '/techicons/langchain.webp',
      'vite': '/techicons/vite.png',
      'electron': '/techicons/electron.png',
      'react-native': '/techicons/react-native-logo.svg',
      'cursor': '/techicons/cursor.jpeg',
    };
    
    // Try to match the tech name (case insensitive)
    const techLower = tech.toLowerCase();
    for (const [key, path] of Object.entries(techMap)) {
      if (techLower.includes(key)) {
        return path;
      }
    }
    
    // Default placeholder if no match
    return '/placeholder.svg';
  };

  // Only render animations on client side
  const animationClass = isMounted ? (inView ? "animate-slide-up" : "opacity-0") : "opacity-0"
  const delayedAnimationClass = isMounted ? (inView ? "animate-slide-up delay-100" : "opacity-0") : "opacity-0"
  
  return (
    <section id="projects" className="bg-secondary py-20 md:py-32">
      <div ref={ref} className="container px-4 md:px-6">
        <div className={`mb-12 max-w-2xl ${animationClass}`}>
          <h2 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">{dictionary.title}</h2>
          <p className="text-lg text-muted-foreground">{dictionary.subtitle}</p>
        </div>

        <div className={`mb-10 flex flex-wrap gap-2 ${delayedAnimationClass}`}>
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            onClick={() => setActiveFilter("all")}
            className="rounded-full"
          >
            {dictionary.filterAll}
          </Button>
          <Button
            variant={activeFilter === "work" ? "default" : "outline"}
            onClick={() => setActiveFilter("work")}
            className="rounded-full"
          >
            {dictionary.filterWork}
          </Button>
          <Button
            variant={activeFilter === "personal" ? "default" : "outline"}
            onClick={() => setActiveFilter("personal")}
            className="rounded-full"
          >
            {dictionary.filterPersonal}
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects?.map((project) => (
            <Card
              key={project.id}
              className={`group overflow-hidden border-none transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer ${animationClass}`}
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-2 flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="mb-2 text-xl font-bold">{project.name}</h3>
                <p className="mb-4 text-muted-foreground">{project.description}</p>
                
                {/* Tech icons */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-muted-foreground font-medium mr-1">
                      {dictionary.technology}:
                    </span>
                    {project.technologies.slice(0, 4).map((tech: string, index: number) => (
                      <div key={`${project.id}-tech-${index}`} className="flex items-center">
                        <div className="h-6 w-6 rounded-md bg-white overflow-hidden shadow-sm">
                          <Image
                            src={getTechIconPath(tech)}
                            alt={tech}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                )}
                
                <button 
                  className="inline-flex items-center text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project.id);
                  }}
                >
                  {dictionary.viewProject}
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {isMounted && selectedProject && (
        <ProjectDetailWrapper
          project={selectedProject}
          dictionary={{
            viewProject: dictionary.viewProject,
            technology: dictionary.technology || "Technologies",
            backToProjects: dictionary.backToProjects || "Back to Projects"
          }}
          onClose={handleProjectClose}
        />
      )}
    </section>
  )
}

