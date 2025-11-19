"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CreditCard, IndianRupee } from "lucide-react"

interface PaymentGatewayProps {
  division: string
  customerName: string
  customerEmail: string
  customerPhone: string
  referenceId: string
}

export default function PaymentGateway({
  division,
  customerName,
  customerEmail,
  customerPhone,
  referenceId
}: PaymentGatewayProps) {
  const [paymentType, setPaymentType] = useState("consultation")
  const [customAmount, setCustomAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const paymentAmounts: Record<string, number> = {
    consultation: 500,
    booking: 5000,
    sample: 1000
  }

  const getAmount = () => {
    if (paymentType === "custom") {
      return parseFloat(customAmount) || 0
    }
    return paymentAmounts[paymentType] || 0
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    const amount = getAmount()
    
    if (amount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    setIsProcessing(true)
    setError("")

    try {
      // Load Razorpay script
      const res = await loadRazorpayScript()

      if (!res) {
        setError("Failed to load payment gateway. Please try again.")
        setIsProcessing(false)
        return
      }

      // Create order on backend
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise
          currency: "INR",
          referenceId,
          customerEmail,
          customerPhone,
          division,
          paymentType
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create order")
      }

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummy_key",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SK Group of Connections",
        description: `${paymentType.charAt(0).toUpperCase() + paymentType.slice(1)} Fee - ${division}`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Verify payment on backend
          try {
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                referenceId
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.success) {
              alert("Payment successful! You will receive a confirmation email shortly.")
              window.location.href = "/"
            } else {
              setError("Payment verification failed. Please contact support.")
            }
          } catch (err) {
            setError("Payment verification failed. Please contact support.")
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        notes: {
          referenceId,
          division,
          paymentType
        },
        theme: {
          color: "#000000",
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
      
      paymentObject.on("payment.failed", function (response: any) {
        setError(response.error.description || "Payment failed. Please try again.")
      })

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-2xl">Make Payment</CardTitle>
            <CardDescription>Reference ID: {referenceId}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">Select Payment Type</Label>
          <RadioGroup value={paymentType} onValueChange={setPaymentType}>
            <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="consultation" id="consultation" />
              <Label htmlFor="consultation" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Consultation Fee</p>
                    <p className="text-sm text-muted-foreground">Professional consultation service</p>
                  </div>
                  <div className="flex items-center text-lg font-semibold">
                    <IndianRupee className="h-4 w-4" />
                    {paymentAmounts.consultation}
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="booking" id="booking" />
              <Label htmlFor="booking" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Booking Advance</p>
                    <p className="text-sm text-muted-foreground">Advance payment for services</p>
                  </div>
                  <div className="flex items-center text-lg font-semibold">
                    <IndianRupee className="h-4 w-4" />
                    {paymentAmounts.booking}
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="sample" id="sample" />
              <Label htmlFor="sample" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sample Order</p>
                    <p className="text-sm text-muted-foreground">Order product samples</p>
                  </div>
                  <div className="flex items-center text-lg font-semibold">
                    <IndianRupee className="h-4 w-4" />
                    {paymentAmounts.sample}
                  </div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom" className="flex-1 cursor-pointer">
                <div className="space-y-2">
                  <p className="font-medium">Custom Amount</p>
                  {paymentType === "custom" && (
                    <Input
                      type="number"
                      placeholder="Enter amount in ₹"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      min="1"
                      step="1"
                    />
                  )}
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg bg-muted p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Division:</span>
            <span className="font-medium">{division}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment Type:</span>
            <span className="font-medium">{paymentType.charAt(0).toUpperCase() + paymentType.slice(1)}</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-xl font-bold flex items-center">
              <IndianRupee className="h-5 w-5" />
              {getAmount().toFixed(2)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handlePayment}
            className="w-full"
            size="lg"
            disabled={isProcessing || getAmount() <= 0}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Pay with Razorpay
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by Razorpay. All major cards, UPI, and net banking accepted.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
