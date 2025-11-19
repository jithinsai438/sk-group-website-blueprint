"use client"

import { Building2, Scale, Megaphone, Calendar, Package, CheckCircle2, Users, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DivisionCard from "@/components/DivisionCard"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Home() {
  const divisions = [
    {
      icon: Building2,
      title: "Construction & Real Estate",
      description: "2D & 3D architectural design, turnkey solutions for apartments, villas, and commercial complexes.",
      email: "construction@skgroupconnections.in"
    },
    {
      icon: Scale,
      title: "Legal Network",
      description: "Connecting advocates nationwide under SK authentication. Legal consultancy for government and corporate projects.",
      email: "legal@skgroupconnections.in"
    },
    {
      icon: Megaphone,
      title: "PR Agency",
      description: "Political, corporate, and media relations. Brand image management and press coordination.",
      email: "pr@skgroupconnections.in"
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Corporate, cultural, and public event execution. Media and logistics coordination.",
      email: "events@skgroupconnections.in"
    },
    {
      icon: Package,
      title: "Tissue Manufacturing & Distribution",
      description: "Premium facial tissues, napkins, and kitchen rolls. Eco-friendly manufacturing and custom branding.",
      email: "tissues@skgroupconnections.in"
    }
  ]

  const stats = [
    { label: "Divisions", value: "5", icon: TrendingUp },
    { label: "Industries Served", value: "50+", icon: Building2 },
    { label: "Happy Clients", value: "1000+", icon: Users },
    { label: "Years of Excellence", value: "10+", icon: Award }
  ]

  const features = [
    {
      title: "Integrated Solutions",
      description: "Five specialized divisions working together to deliver comprehensive business solutions across India."
    },
    {
      title: "Trusted Network",
      description: "A nationwide network of professionals committed to delivering quality, reliability, and excellence."
    },
    {
      title: "Innovation Driven",
      description: "Leveraging cutting-edge technology and best practices to stay ahead in every sector we serve."
    },
    {
      title: "Client-Centric",
      description: "Your success is our priority. We provide personalized, cost-effective solutions tailored to your needs."
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-5xl text-center space-y-8 md:space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm font-medium shadow-sm">
              <Award className="h-4 w-4 text-primary" />
              <span>Founded by Shashank Pasupuleti</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                <span className="block">Five Divisions,</span>
                <span className="block text-primary">One Vision</span>
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl lg:text-3xl font-medium max-w-3xl mx-auto">
                Building India through Connection and Commitment
              </p>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              SK Group of Connections brings together <span className="font-semibold text-foreground">Construction</span>, <span className="font-semibold text-foreground">Legal</span>, <span className="font-semibold text-foreground">PR</span>, <span className="font-semibold text-foreground">Event</span>, and <span className="font-semibold text-foreground">Tissue Manufacturing</span> under one unified umbrella.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-base h-12 px-8 shadow-lg hover:shadow-xl transition-all">
                <Link href="#divisions">Explore Our Divisions</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base h-12 px-8 border-2 hover:bg-accent">
                <Link href="/contact">Make an Enquiry</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Stats Section - New */}
      <section className="py-12 md:py-16 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center space-y-2 group">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - New */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Why Choose SK Group?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of integrated expertise across multiple industries
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature) => (
              <div key={feature.title} className="group p-6 rounded-xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions Grid - Enhanced */}
      <section id="divisions" className="py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium mb-4">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Our Services</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Our Divisions
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions across five dynamic sectors, delivering excellence at every touchpoint
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {divisions.map((division, index) => (
              <div 
                key={division.title}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DivisionCard
                  icon={division.icon}
                  title={division.title}
                  description={division.description}
                  email={division.email}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - New */}
      <section className="py-16 md:py-20 bg-background border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Trusted by Businesses Across India
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              From government projects to corporate collaborations, SK Group has established itself as a reliable partner delivering consistent results with transparency and professionalism.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="px-6 py-3 rounded-full bg-muted text-sm font-medium">
                Government Projects
              </div>
              <div className="px-6 py-3 rounded-full bg-muted text-sm font-medium">
                Corporate Solutions
              </div>
              <div className="px-6 py-3 rounded-full bg-muted text-sm font-medium">
                Nationwide Network
              </div>
              <div className="px-6 py-3 rounded-full bg-muted text-sm font-medium">
                Quality Assured
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-6 md:space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to Connect?
            </h2>
            <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
              Partner with SK Group of Connections for reliable, high-quality, and cost-effective services across India. Let's build something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" variant="secondary" className="text-base h-12 px-8 shadow-lg hover:shadow-xl transition-all">
                <Link href="/about">Learn More About Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base h-12 px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all">
                <Link href="/contact">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}