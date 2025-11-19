"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Building2, Scale, Megaphone, Calendar, PackageOpen, ArrowRight, MapPin, Clock } from "lucide-react"
import { useState } from "react"

const divisions = [
  { id: "all", name: "All Projects", icon: null },
  { id: "construction", name: "Construction", icon: Building2 },
  { id: "legal", name: "Legal", icon: Scale },
  { id: "pr", name: "PR Agency", icon: Megaphone },
  { id: "events", name: "Events", icon: Calendar },
  { id: "tissue", name: "Tissue Manufacturing", icon: PackageOpen },
]

const projects = [
  {
    id: 1,
    title: "Luxury Residential Complex - Hyderabad",
    division: "construction",
    description: "150-unit premium residential complex with modern amenities and sustainable design features.",
    status: "Completed",
    location: "Hyderabad, Telangana",
    duration: "18 months",
    image: "/placeholder-construction.jpg",
    tags: ["Residential", "Premium", "Sustainable"]
  },
  {
    id: 2,
    title: "Corporate Legal Compliance Audit",
    division: "legal",
    description: "Comprehensive legal audit and compliance framework for a Fortune 500 company expansion in India.",
    status: "Completed",
    location: "Pan India",
    duration: "6 months",
    image: "/placeholder-legal.jpg",
    tags: ["Corporate", "Compliance", "Consulting"]
  },
  {
    id: 3,
    title: "State Election Campaign Management",
    division: "pr",
    description: "Full-scale PR and media management for a major political campaign across 25 constituencies.",
    status: "Completed",
    location: "Telangana",
    duration: "4 months",
    image: "/placeholder-pr.jpg",
    tags: ["Political", "Media", "Campaign"]
  },
  {
    id: 4,
    title: "International Tech Conference 2024",
    division: "events",
    description: "Organized a 3-day tech conference with 2000+ attendees, 50+ speakers, and live streaming.",
    status: "Completed",
    location: "Bangalore, Karnataka",
    duration: "3 days",
    image: "/placeholder-events.jpg",
    tags: ["Corporate", "Technology", "International"]
  },
  {
    id: 5,
    title: "Eco-Friendly Tissue Product Line Launch",
    division: "tissue",
    description: "Developed and launched a new line of 100% biodegradable tissue products with custom branding.",
    status: "Ongoing",
    location: "Manufacturing Hub - Hyderabad",
    duration: "12 months",
    image: "/placeholder-tissue.jpg",
    tags: ["Eco-Friendly", "Manufacturing", "Innovation"]
  },
  {
    id: 6,
    title: "Commercial Office Tower - Vijayawada",
    division: "construction",
    description: "20-story commercial tower with smart building technology and LEED certification.",
    status: "Ongoing",
    location: "Vijayawada, Andhra Pradesh",
    duration: "24 months",
    image: "/placeholder-construction-2.jpg",
    tags: ["Commercial", "Smart Building", "LEED"]
  },
  {
    id: 7,
    title: "Government Infrastructure Legal Advisory",
    division: "legal",
    description: "Legal consultation and documentation for major government infrastructure projects worth ₹500Cr+.",
    status: "Ongoing",
    location: "Andhra Pradesh & Telangana",
    duration: "18 months",
    image: "/placeholder-legal-2.jpg",
    tags: ["Government", "Infrastructure", "Advisory"]
  },
  {
    id: 8,
    title: "Brand Relaunch Campaign - Leading FMCG",
    division: "pr",
    description: "Complete brand image overhaul and relaunch campaign for a leading FMCG company.",
    status: "Completed",
    location: "Pan India",
    duration: "8 months",
    image: "/placeholder-pr-2.jpg",
    tags: ["Corporate", "Branding", "FMCG"]
  },
  {
    id: 9,
    title: "Cultural Festival - Sankranti Celebrations",
    division: "events",
    description: "Large-scale cultural festival celebrating traditional festivals with 10,000+ attendees.",
    status: "Completed",
    location: "Hyderabad, Telangana",
    duration: "5 days",
    image: "/placeholder-events-2.jpg",
    tags: ["Cultural", "Traditional", "Community"]
  },
]

export default function ProjectsPage() {
  const [selectedDivision, setSelectedDivision] = useState("all")

  const filteredProjects = selectedDivision === "all" 
    ? projects 
    : projects.filter(p => p.division === selectedDivision)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <Badge variant="secondary" className="mb-2">
              Our Portfolio
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Projects That Define
              <span className="block text-primary mt-2">Excellence & Innovation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From construction landmarks to legal triumphs, PR campaigns to memorable events — explore our diverse portfolio across all five divisions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b bg-background sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {divisions.map((division) => {
              const Icon = division.icon
              return (
                <Button
                  key={division.id}
                  variant={selectedDivision === division.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDivision(division.id)}
                  className="gap-2"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {division.name}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="flex-1 py-16">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => {
                  const DivisionIcon = divisions.find(d => d.id === project.division)?.icon
                  return (
                    <div
                      key={project.id}
                      className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      {/* Project Image Placeholder */}
                      <div className="relative h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {DivisionIcon && (
                            <DivisionIcon className="h-20 w-20 text-primary/20 group-hover:scale-110 transition-transform" />
                          )}
                        </div>
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="p-6 space-y-4">
                        {/* Division Badge */}
                        <div className="flex items-center gap-2">
                          {DivisionIcon && <DivisionIcon className="h-4 w-4 text-primary" />}
                          <Badge variant="outline" className="text-xs">
                            {divisions.find(d => d.id === project.division)?.name}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {project.description}
                          </p>
                        </div>

                        {/* Meta Info */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{project.duration}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* View Details Button */}
                        <Button variant="ghost" className="w-full group/btn" asChild>
                          <Link href={`/contact?division=${project.division}`}>
                            Learn More & Enquire
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground">
              Let's bring your vision to life. Get in touch with our team to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Make an Enquiry</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}