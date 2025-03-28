import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SkillsProps {
  dictionary: {
    title: string
    categories: {
      name: string
      skills: string[]
    }[]
  }
}

export function Skills({ dictionary }: SkillsProps) {
  return (
    <Section id="skills" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{dictionary.title}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dictionary.categories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}

