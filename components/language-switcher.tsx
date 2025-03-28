"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LanguageSwitcherProps {
  currentLang: string
  isScrolled?: boolean
}

export function LanguageSwitcher({ currentLang, isScrolled = false }: LanguageSwitcherProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (lang: string) => {
    if (lang === currentLang) return
    router.push(`/${lang}`)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={`h-8 w-8 rounded-full transition-colors ${
          isScrolled ? "text-foreground hover:text-accent-foreground" : "text-white hover:text-white/80"
        }`}>
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("en")} className={currentLang === "en" ? "bg-accent" : ""}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("es")} className={currentLang === "es" ? "bg-accent" : ""}>
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

