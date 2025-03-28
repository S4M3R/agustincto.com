import { Section } from "@/components/ui/section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExperienceProps {
  dictionary: {
    title: string
    jobs: {
      title: string
      company: string
      period: string
      location: string
      description: string[]
    }[]
  }
}

export function Experience({ dictionary }: ExperienceProps) {
  return (
    <Section id="experience" className="bg-muted py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{dictionary.title}</h2>
        <div className="grid gap-6">
          {dictionary.jobs.map((job, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {job.title} @ {job.company}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {job.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="ml-6 list-disc space-y-2">
                  {job.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}

