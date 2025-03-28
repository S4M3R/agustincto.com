import { GitlabIcon as GitHub, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

interface FooterProps {
  dictionary: {
    copyright: string
  }
}

export function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="border-t py-12">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p className="text-center text-sm text-muted-foreground md:text-left">{dictionary.copyright}</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/agustincto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/agustinsuarezmerino"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:samerstudio@outlook.com"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

