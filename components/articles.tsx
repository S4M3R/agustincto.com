"use client"

import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  link: string
}

interface ArticlesProps {
  dictionary: {
    title: string
    subtitle: string
    readMore: string
    viewAll: string
  }
}

export function Articles({ dictionary }: ArticlesProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Sample articles data
  const articles: Article[] = [
    {
      id: "1",
      title: "Building Scalable SaaS Applications with Next.js",
      excerpt: "Learn how to architect and build scalable SaaS applications using Next.js and modern web technologies.",
      date: "2024-03-15",
      image: "/placeholder.svg?height=400&width=600&text=Next.js+SaaS",
      link: "#",
    },
    {
      id: "2",
      title: "The Future of AI in Business Applications",
      excerpt:
        "Exploring how AI is transforming business applications and what it means for developers and entrepreneurs.",
      date: "2024-02-28",
      image: "/placeholder.svg?height=400&width=600&text=AI+Business",
      link: "#",
    },
    {
      id: "3",
      title: "From Idea to Launch: My Journey Building Ventia",
      excerpt: "The challenges and lessons learned from building and scaling a CRM platform from scratch.",
      date: "2024-01-10",
      image: "/placeholder.svg?height=400&width=600&text=Startup+Journey",
      link: "#",
    },
  ]

  return (
    <section id="articles" className="py-20 md:py-32">
      <div ref={ref} className="container px-4 md:px-6">
        <div className={`mb-12 max-w-2xl ${inView ? "animate-slide-up" : "opacity-0"}`}>
          <h2 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">{dictionary.title}</h2>
          <p className="text-lg text-muted-foreground">{dictionary.subtitle}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article, index) => (
            <Card
              key={article.id}
              className={`overflow-hidden border-none transition-all hover:-translate-y-1 hover:shadow-lg ${
                inView ? `animate-scale delay-${(index + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <p className="mb-2 text-sm text-muted-foreground">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="mb-2 text-xl font-bold">{article.title}</h3>
                <p className="mb-4 text-muted-foreground">{article.excerpt}</p>
                <Link href={article.link} className="inline-flex items-center text-sm font-medium">
                  {dictionary.readMore}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`mt-10 flex justify-center ${inView ? "animate-fade-in delay-500" : "opacity-0"}`}>
          <Button variant="outline" size="lg">
            {dictionary.viewAll}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

