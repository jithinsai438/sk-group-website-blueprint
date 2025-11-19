"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

interface Project {
  id: number
  title: string
  division: string
}

interface EnquiryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: Project | null
}

const divisions = [
  { id: "construction", name: "Construction & Real Estate" },
  { id: "legal", name: "Legal Network" },
  { id: "pr", name: "PR Agency" },
  { id: "events", name: "Event Management" },
  { id: "tissue", name: "Tissue Manufacturing" },
]

export function EnquiryDialog({ open, onOpenChange, project }: EnquiryDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    division: project?.division || "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone || !formData.division || !formData.message) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)
      
      const response = await fetch("/api/project-enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          division: formData.division,
          message: formData.message,
          projectId: project?.id || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry")
      }

      setSuccess(true)
      toast.success("Enquiry submitted successfully! We'll get back to you soon.")
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          division: "",
          message: "",
        })
        setSuccess(false)
        onOpenChange(false)
      }, 2000)
      
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to submit enquiry")
      console.error("Error submitting enquiry:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!loading) {
      onOpenChange(newOpen)
      if (!newOpen) {
        // Reset success state when closing
        setTimeout(() => setSuccess(false), 300)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {success ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl">Enquiry Submitted!</DialogTitle>
              <DialogDescription className="text-base">
                Thank you for your interest. Our team will contact you shortly.
              </DialogDescription>
            </DialogHeader>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Make an Enquiry</DialogTitle>
              <DialogDescription>
                {project 
                  ? `Interested in "${project.title}"? Fill out the form below and we'll get back to you.`
                  : "Fill out the form below and we'll get back to you soon."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 1234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="division">
                  Division <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.division}
                  onValueChange={(value) => setFormData({ ...formData, division: value })}
                  disabled={loading || !!project}
                >
                  <SelectTrigger id="division">
                    <SelectValue placeholder="Select a division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((div) => (
                      <SelectItem key={div.id} value={div.id}>
                        {div.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  disabled={loading}
                  rows={4}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
