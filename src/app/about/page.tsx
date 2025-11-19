import { Building2, Scale, Megaphone, Calendar, Package, Target, Eye, Heart } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  const values = [
    { icon: Heart, title: "Integrity", description: "Operating with transparency and ethical standards in all our dealings." },
    { icon: Target, title: "Innovation", description: "Embracing new ideas and technologies to deliver cutting-edge solutions." },
    { icon: Scale, title: "Trust", description: "Building lasting relationships through reliability and consistent performance." },
    { icon: Eye, title: "Commitment", description: "Dedicated to excellence and timely delivery in every project we undertake." },
    { icon: Building2, title: "Connection", description: "Creating synergistic networks that empower professionals and businesses." }
  ]

  const divisions = [
    {
      icon: Building2,
      title: "Construction & Real Estate",
      services: [
        "2D & 3D architectural design",
        "Turnkey solutions for apartments, villas, commercial complexes",
        "Quality control and cost management",
        "Timely delivery and project coordination"
      ],
      email: "construction@skgroupconnections.in"
    },
    {
      icon: Scale,
      title: "Legal Network",
      services: [
        "Connecting advocates nationwide under SK authentication",
        "Legal consultancy for government and corporate projects",
        "Coordination with TPCC Legal Cell",
        "Comprehensive legal support services"
      ],
      email: "legal@skgroupconnections.in"
    },
    {
      icon: Megaphone,
      title: "PR Agency",
      services: [
        "Political, corporate, and media relations",
        "Brand image management and press coordination",
        "Digital and influencer outreach",
        "Strategic communication planning"
      ],
      email: "pr@skgroupconnections.in"
    },
    {
      icon: Calendar,
      title: "Event Management",
      services: [
        "Corporate, cultural, and public event execution",
        "Media and logistics coordination",
        "End-to-end event planning",
        "Professional event production"
      ],
      email: "events@skgroupconnections.in"
    },
    {
      icon: Package,
      title: "Tissue Manufacturing & Distribution",
      services: [
        "Premium facial tissues, napkins, and kitchen rolls",
        "Eco-friendly manufacturing processes",
        "Custom branding solutions",
        "Bulk supply across India"
      ],
      email: "tissues@skgroupconnections.in"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              About SK Group of Connections
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              A multifaceted enterprise operating across construction, legal, PR, event management, and tissue manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed text-muted-foreground">
                SK Group of Connections is a multifaceted enterprise operating in construction, legal, PR, event management, and tissue manufacturing. Founded by <span className="font-semibold text-foreground">Shashank Pasupuleti</span>, it stands on the pillars of innovation, transparency, and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Target className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create synergistic connections across diverse industries, delivering reliable, high-quality, cost-effective services throughout India.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Eye className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be India's most trusted multi-sector network, empowering professionals, businesses, and communities through excellence and innovation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision and action we take.
            </p>
          </div>
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions Detail */}
      <section id="divisions" className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our Divisions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive services across five dynamic sectors.
            </p>
          </div>
          <div className="mx-auto max-w-6xl space-y-8">
            {divisions.map((division, index) => (
              <Card key={division.title} className="overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                      <division.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{index + 1}. {division.title}</CardTitle>
                      <CardDescription className="text-base">
                        Contact: <a href={`mailto:${division.email}`} className="hover:text-primary transition-colors font-medium">{division.email}</a>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="grid md:grid-cols-2 gap-3">
                    {division.services.map((service) => (
                      <li key={service} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
