"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, Upload, X, CreditCard } from "lucide-react"
import Link from "next/link"

interface EnquiryFormData {
  name: string
  email: string
  phone: string
  city: string
  division: string
  subject: string
  message: string
  file?: FileList
}

interface EnquiryFormProps {
  preselectedDivision?: string
}

export default function EnquiryForm({ preselectedDivision }: EnquiryFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [referenceId, setReferenceId] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState("")

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<EnquiryFormData>({
    defaultValues: {
      division: preselectedDivision || ""
    }
  })

  const selectedDivision = watch("division")

  const divisions = [
    "Construction & Real Estate",
    "Legal Network",
    "PR Agency",
    "Event Management",
    "Tissue Manufacturing & Distribution"
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size should not exceed 10MB")
        return
      }
      setSelectedFile(file)
      setError("")
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setValue("file", undefined)
  }

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("email", data.email)
      formData.append("phone", data.phone)
      formData.append("city", data.city)
      formData.append("division", data.division)
      formData.append("subject", data.subject)
      formData.append("message", data.message)
      
      if (selectedFile) {
        formData.append("file", selectedFile)
      }

      const response = await fetch("/api/enquiry", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit enquiry")
      }

      setReferenceId(result.referenceId)
      setSubmitSuccess(true)
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess && step === 3) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Thank You!</CardTitle>
          <CardDescription className="text-base">
            Your enquiry has been submitted successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground mb-1">Your Reference ID</p>
            <p className="text-xl font-mono font-semibold">{referenceId}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            We've sent a confirmation email to your registered email address. Our team will review your enquiry and get back to you within 24-48 hours.
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              asChild 
              size="lg" 
              className="w-full"
            >
              <Link 
                href={`/payment?division=${encodeURIComponent(watch("division"))}&name=${encodeURIComponent(watch("name"))}&email=${encodeURIComponent(watch("email"))}&phone=${encodeURIComponent(watch("phone"))}&ref=${referenceId}`}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Proceed to Payment (Optional)
              </Link>
            </Button>
            <div className="flex gap-3">
              <Button onClick={() => window.location.reload()} variant="outline" className="flex-1">
                Submit Another Enquiry
              </Button>
              <Button onClick={() => window.location.href = "/"} variant="outline" className="flex-1">
                Back to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Make an Enquiry</CardTitle>
          <CardDescription>
            Fill in your details and we'll get back to you within 24-48 hours.
          </CardDescription>
          {step === 1 && (
            <div className="mt-4 flex gap-2">
              <div className="h-2 flex-1 rounded-full bg-primary"></div>
              <div className="h-2 flex-1 rounded-full bg-muted"></div>
            </div>
          )}
          {step === 2 && (
            <div className="mt-4 flex gap-2">
              <div className="h-2 flex-1 rounded-full bg-primary"></div>
              <div className="h-2 flex-1 rounded-full bg-primary"></div>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", { 
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number"
                    }
                  })}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...register("city", { required: "City is required" })}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="division">Select Division *</Label>
                <Select
                  value={selectedDivision}
                  onValueChange={(value) => setValue("division", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((division) => (
                      <SelectItem key={division} value={division}>
                        {division}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.division && (
                  <p className="text-sm text-destructive">{errors.division.message}</p>
                )}
              </div>

              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  const fields = ["name", "email", "phone", "city", "division"]
                  const values = watch(fields as any)
                  const hasErrors = fields.some(field => !values[field as keyof typeof values])
                  
                  if (!hasErrors) {
                    setStep(2)
                  }
                }}
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="Brief subject of your enquiry"
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  placeholder="Describe your requirements in detail..."
                  rows={6}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Attach File (Optional)</Label>
                <div className="space-y-2">
                  {!selectedFile ? (
                    <div className="relative">
                      <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Upload className="h-4 w-4" />
                          <span className="text-sm">Upload document (Max 10MB)</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedFile.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(selectedFile.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  )
}