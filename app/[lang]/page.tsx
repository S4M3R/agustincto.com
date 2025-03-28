import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Articles } from "@/components/articles"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Skills } from "@/components/skills"
import { CurrentStartup } from "@/components/current-startup"
import { getDictionary } from "@/lib/dictionary"

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <div className="min-h-screen bg-background">
      <Header dictionary={dictionary.header} currentLang={lang} />
      <Hero dictionary={dictionary.hero} />
      <About dictionary={dictionary.about} />
      <CurrentStartup dictionary={dictionary.currentStartup} />
      <Projects dictionary={dictionary.projects} />
      <Skills dictionary={dictionary.skills} />
      <Articles dictionary={dictionary.articles} />
      <Contact dictionary={dictionary.contact} />
      <Footer dictionary={dictionary.footer} />
    </div>
  )
}

