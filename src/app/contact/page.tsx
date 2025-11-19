"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import EnquiryForm from "@/components/EnquiryForm"
import { Skeleton } from "@/components/ui/skeleton"

function ContactContent() {
  const searchParams = useSearchParams()
  const preselectedDivision = searchParams.get("division")

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Have a question or ready to start a project? We're here to help.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <EnquiryForm preselectedDivision={preselectedDivision || undefined} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-2xl space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
        <Footer />
      </div>
    }>
      <ContactContent />
    </Suspense>
  )
}
