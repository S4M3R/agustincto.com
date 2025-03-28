"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"

interface HeaderProps {
  dictionary: {
    about: string
    projects: string
    articles: string
    contact: string
  }
  currentLang: string
}

export function Header({ dictionary, currentLang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/90 py-2 shadow-md backdrop-blur-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link href={`/${currentLang}`} className="text-xl font-bold tracking-tight">
          Agustin
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link href="#about" className="text-sm font-medium transition-colors hover:text-accent-foreground">
            {dictionary.about}
          </Link>
          <Link href="#projects" className="text-sm font-medium transition-colors hover:text-accent-foreground">
            {dictionary.projects}
          </Link>
          <Link href="#articles" className="text-sm font-medium transition-colors hover:text-accent-foreground">
            {dictionary.articles}
          </Link>
          <Link href="#contact" className="text-sm font-medium transition-colors hover:text-accent-foreground">
            {dictionary.contact}
          </Link>
          <LanguageSwitcher currentLang={currentLang} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <LanguageSwitcher currentLang={currentLang} />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="ml-2">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="absolute left-0 top-full flex w-full flex-col bg-background py-4 shadow-md md:hidden">
          <Link
            href="#about"
            className="px-6 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {dictionary.about}
          </Link>
          <Link
            href="#projects"
            className="px-6 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {dictionary.projects}
          </Link>
          <Link
            href="#articles"
            className="px-6 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {dictionary.articles}
          </Link>
          <Link
            href="#contact"
            className="px-6 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {dictionary.contact}
          </Link>
        </nav>
      )}
    </header>
  )
}

