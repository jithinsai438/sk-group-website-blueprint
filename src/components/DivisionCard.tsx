"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface DivisionCardProps {
  icon: LucideIcon
  title: string
  description: string
  email: string
}

export default function DivisionCard({ icon: Icon, title, description, email }: DivisionCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">
          Contact: <a href={`mailto:${email}`} className="hover:text-primary transition-colors">{email}</a>
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild variant="default" className="flex-1">
          <Link href="/about#divisions">Know More</Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/contact?division=${encodeURIComponent(title)}`}>Enquire Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
