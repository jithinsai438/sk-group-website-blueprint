"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PaymentGateway from "@/components/PaymentGateway"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

function PaymentContent() {
  const searchParams = useSearchParams()
  
  const division = searchParams.get("division") || ""
  const customerName = searchParams.get("name") || ""
  const customerEmail = searchParams.get("email") || ""
  const customerPhone = searchParams.get("phone") || ""
  const referenceId = searchParams.get("ref") || ""

  if (!division || !customerEmail || !referenceId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <section className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Invalid payment link. Please submit an enquiry first.
              </AlertDescription>
            </Alert>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Complete Your Payment
            </h1>
            <p className="text-lg text-muted-foreground">
              Secure payment gateway powered by Razorpay
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <PaymentGateway
            division={division}
            customerName={customerName}
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            referenceId={referenceId}
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-2xl space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
        <Footer />
      </div>
    }>
      <PaymentContent />
    </Suspense>
  )
}
