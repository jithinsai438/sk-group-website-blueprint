import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const divisions = [
    {
      name: "Construction & Real Estate",
      email: "construction@skgroupconnections.in",
      href: "/#divisions"
    },
    {
      name: "Legal Network",
      email: "legal@skgroupconnections.in",
      href: "/#divisions"
    },
    {
      name: "PR Agency",
      email: "pr@skgroupconnections.in",
      href: "/#divisions"
    },
    {
      name: "Event Management",
      email: "events@skgroupconnections.in",
      href: "/#divisions"
    },
    {
      name: "Tissue Manufacturing",
      email: "tissues@skgroupconnections.in",
      href: "/#divisions"
    },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "News & Updates", href: "/news" },
    { name: "Join Us", href: "/join-us" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">SK GROUP of Connections</h3>
            <p className="text-sm text-muted-foreground">
              Five Divisions, One Vision — Building India through Connection and Commitment.
            </p>
            <div className="flex flex-col space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>info@skgroupconnections.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-semibold">Our Divisions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {divisions.map((division) => (
                <div key={division.name} className="space-y-1">
                  <Link
                    href={division.href}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {division.name}
                  </Link>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <a
                      href={`mailto:${division.email}`}
                      className="hover:text-foreground transition-colors text-xs"
                    >
                      {division.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} SK Group of Connections. All rights reserved.
          </p>
          <p className="mt-2">
            Founded by <span className="font-semibold">Shashank Pasupuleti</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
