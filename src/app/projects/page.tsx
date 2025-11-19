"use client"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Building2, Scale, Megaphone, Calendar, PackageOpen, ArrowRight, MapPin, Clock, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { EnquiryDialog } from "@/components/EnquiryDialog"

const divisions = [
  { id: "all", name: "All Projects", icon: null },
  { id: "construction", name: "Construction", icon: Building2 },
  { id: "legal", name: "Legal", icon: Scale },
  { id: "pr", name: "PR Agency", icon: Megaphone },
  { id: "events", name: "Events", icon: Calendar },
  { id: "tissue", name: "Tissue Manufacturing", icon: PackageOpen },
]

interface Project {
  id: number
  title: string
  division: string
  description: string
  status: string
  location: string
  duration: string
  image: string | null
  tags: string[] | null
  createdAt: string
  updatedAt: string
}

export default function ProjectsPage() {
  const [selectedDivision, setSelectedDivision] = useState("all")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [enquiryDialogOpen, setEnquiryDialogOpen] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [selectedDivision])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const url = selectedDivision === "all" 
        ? "/api/projects" 
        : `/api/projects?division=${selectedDivision}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }
      
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching projects:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleEnquiryClick = (project: Project) => {
    setSelectedProject(project)
    setEnquiryDialogOpen(true)
  }

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
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">Loading projects...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive text-lg mb-4">Error: {error}</p>
              <Button onClick={fetchProjects} variant="outline">
                Retry
              </Button>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects found in this category.</p>
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{projects.length}</span> {projects.length === 1 ? 'project' : 'projects'}
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => {
                  const DivisionIcon = divisions.find(d => d.id === project.division)?.icon
                  return (
                    <div
                      key={project.id}
                      className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500"
                      style={{ animationDelay: `${index * 100}ms` }}
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
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Enquire Button */}
                        <Button 
                          variant="ghost" 
                          className="w-full group/btn"
                          onClick={() => handleEnquiryClick(project)}
                        >
                          Learn More & Enquire
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
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

      {/* Enquiry Dialog */}
      <EnquiryDialog
        open={enquiryDialogOpen}
        onOpenChange={setEnquiryDialogOpen}
        project={selectedProject}
      />
    </div>
  )
}