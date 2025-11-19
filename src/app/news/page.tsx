import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              News & Updates
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay informed about the latest developments, announcements, and milestones from SK Group of Connections.
            </p>
            <p className="text-muted-foreground">
              Content coming soon. Check back regularly for news, press releases, and company updates.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Subscribe to Updates</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
