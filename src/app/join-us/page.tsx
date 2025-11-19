import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Briefcase, Users, TrendingUp, Award } from "lucide-react"

export default function JoinUsPage() {
  const opportunities = [
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Join our dynamic team across construction, legal, PR, events, and manufacturing sectors."
    },
    {
      icon: Users,
      title: "Partnership Programs",
      description: "Collaborate with us as a strategic partner or service provider in your domain."
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Expand your professional network and grow your business with SK Group."
    },
    {
      icon: Award,
      title: "Excellence & Recognition",
      description: "Be part of an organization that values innovation, integrity, and commitment."
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Join SK Group of Connections
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Be part of India's most trusted multi-sector network
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.title}>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <opportunity.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                  <CardDescription className="text-base">{opportunity.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-muted-foreground">
              Send us your details and let's explore how we can work together.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
