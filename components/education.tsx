import { Section } from "@/components/ui/section"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EducationProps {
  dictionary: {
    title: string
    list: {
      degree: string
      institution: string
      location: string
      period: string
    }[]
  }
}

export function Education({ dictionary }: EducationProps) {
  return (
    <Section id="education" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{dictionary.title}</h2>
        <div className="grid gap-6">
          {dictionary.list.map((edu, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <CardTitle className="text-xl font-bold">{edu.degree}</CardTitle>
                    <p className="text-muted-foreground">
                      {edu.institution}, {edu.location}
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {edu.period}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}

