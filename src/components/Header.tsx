"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Divisions", href: "/#divisions" },
    { name: "Projects", href: "/projects" },
    { name: "News & Updates", href: "/news" },
    { name: "Join Us", href: "/join-us" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image 
            src="/sk-logo.jpg" 
            alt="SK Logo" 
            width={40} 
            height={40}
            className="object-contain"
          />
          <div className="text-xl font-bold">
            <span className="text-primary">SK GROUP</span>
            <span className="text-muted-foreground text-sm ml-2">of Connections</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/contact">Make an Enquiry</Link>
          </Button>
        </nav>

        {/* Shashank Profile - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Image 
            src="/shashank-photo.jpg" 
            alt="Shashank Pasupuleti" 
            width={40} 
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">Shashank Pasupuleti</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <Image 
            src="/shashank-photo.jpg" 
            alt="Shashank Pasupuleti" 
            width={32} 
            height={32}
            className="rounded-full object-cover"
          />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container mx-auto flex flex-col space-y-4 px-4 py-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Image 
                src="/shashank-photo.jpg" 
                alt="Shashank Pasupuleti" 
                width={40} 
                height={40}
                className="rounded-full object-cover"
              />
              <span className="text-sm font-semibold">Shashank Pasupuleti</span>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild size="sm" className="w-full">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Make an Enquiry
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}