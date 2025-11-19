import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "dummy_secret"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      referenceId
    } = body

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification parameters" },
        { status: 400 }
      )
    }

    // Verify signature
    const text = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex")

    const isValid = expectedSignature === razorpay_signature

    if (isValid) {
      // Update payment status in database
      // Store payment details
      // Send confirmation emails
      
      console.log("Payment verified successfully:", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        referenceId
      })

      // In production:
      // - Update database with payment status
      // - Send payment confirmation email to customer
      // - Send notification to admin
      // - Generate GST invoice if applicable

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        paymentId: razorpay_payment_id
      })
    } else {
      console.error("Payment verification failed: Invalid signature")
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    )
  }
}
