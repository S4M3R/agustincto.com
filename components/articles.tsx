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
      title: "Ventia's International Expansion and Microsoft Partnership",
      excerpt: "Exclusive interview with Ventia's leadership team discussing our international growth, AI innovation with Microsoft, and our vision for the future of business management.",
      date: "2024-04-26",
      image: "/articles_image/info_negocios_post.png",
      link: "https://infonegocios.biz/plus/de-startup-a-empresa-ventia-mejora-en-inteligencia-comercial-junto-a-microsoft-y-se-expande-a-peru",
    },
    {
      id: "2",
      title: "First AI Lab in Latin America: Our Journey with Microsoft",
      excerpt: "A week of innovation at the Microsoft AI Co-Innovation Labs, where we developed a new AI integration for VENTIA alongside an amazing team.",
      date: "2024-03-28",
      image: "/articles_image/mf_post_image.png",
      link: "https://www.linkedin.com/posts/agustinsuarezmerino_uruguay-ventia-microsoft-activity-7173719571554676739-IHBC?utm_source=share&utm_medium=member_desktop&rcm=ACoAACSL9tkBmHkVnRSiBW5RwEq7vtFCRRfB46E",
    },
    {
      id: "3",
      title: "Flappy Bird Lands on PIXO: A New Gaming Experience for Kids",
      excerpt: "Exciting new addition to the tech ecosystem: Flappy Bird game developed for PIXO's Arduino-based children's console, bringing classic gaming fun to young players.",
      date: "2024-03-28",
      image: "/articles_image/game_post_image.png",
      link: "https://www.linkedin.com/posts/agustinsuarezmerino_startup-arduino-pixo-activity-7100557766435426304-WftB",
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
          <Button variant="outline" size="lg" asChild>
            <Link href="https://agustincto.hashnode.dev/">
              {dictionary.viewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

