"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  image: string
  tags: string[]
  link: string
  category: string
}

interface ProjectsProps {
  dictionary: {
    title: string
    subtitle: string
    filterAll: string
    filterWork: string
    filterPersonal: string
    viewProject: string
  }
}

export function Projects({ dictionary }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Sample projects data
  const projects: Project[] = [
    {
      id: "1",
      name: "Ventia CRM",
      description: "A comprehensive CRM and analytics platform for SMBs in Latin America.",
      image: "/placeholder.svg?height=600&width=800&text=Ventia+CRM",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
      category: "work",
    },
    {
      id: "2",
      name: "Companion IA",
      description: "Personal AI helper that tracks tasks and improves work based on current context.",
      image: "/placeholder.svg?height=600&width=800&text=Companion+IA",
      tags: ["Electron", "OpenAI", "Vite"],
      link: "#",
      category: "personal",
    },
    {
      id: "3",
      name: "The Circular Tech",
      description: "Fashion product and design manager SaaS platform.",
      image: "/placeholder.svg?height=600&width=800&text=Circular+Tech",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      link: "#",
      category: "work",
    },
    {
      id: "4",
      name: "Startups Uruguay",
      description: "Directory of Uruguayan startups built with Next.js and Tailwind.",
      image: "/placeholder.svg?height=600&width=800&text=Startups+Uruguay",
      tags: ["Next.js", "Tailwind", "Vercel"],
      link: "#",
      category: "personal",
    },
    {
      id: "5",
      name: "Vendedores Pro",
      description: "Platform for SMBs to run their own affiliate programs.",
      image: "/placeholder.svg?height=600&width=800&text=Vendedores+Pro",
      tags: ["React", "Express", "MongoDB"],
      link: "#",
      category: "work",
    },
    {
      id: "6",
      name: "IA Customer Analysis",
      description: "Proof of concept using GPT models for customer analysis.",
      image: "/placeholder.svg?height=600&width=800&text=IA+Analysis",
      tags: ["Python", "GPT", "Data Analysis"],
      link: "#",
      category: "work",
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="projects" className="bg-secondary py-20 md:py-32">
      <div ref={ref} className="container px-4 md:px-6">
        <div className={`mb-12 max-w-2xl ${inView ? "animate-slide-up" : "opacity-0"}`}>
          <h2 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">{dictionary.title}</h2>
          <p className="text-lg text-muted-foreground">{dictionary.subtitle}</p>
        </div>

        <div className={`mb-10 flex flex-wrap gap-2 ${inView ? "animate-slide-up delay-100" : "opacity-0"}`}>
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
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`group overflow-hidden border-none transition-all hover:-translate-y-1 hover:shadow-lg ${
                inView ? `animate-scale delay-${(index + 2) * 100}` : "opacity-0"
              }`}
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
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="mb-2 text-xl font-bold">{project.name}</h3>
                <p className="mb-4 text-muted-foreground">{project.description}</p>
                <Link href={project.link} className="inline-flex items-center text-sm font-medium">
                  {dictionary.viewProject}
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

