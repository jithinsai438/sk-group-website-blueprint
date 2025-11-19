import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// In production, store these in environment variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_dummy_key"
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "dummy_secret"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency, referenceId, customerEmail, customerPhone, division, paymentType } = body

    // Validate required fields
    if (!amount || !referenceId) {
      return NextResponse.json(
        { error: "Amount and reference ID are required" },
        { status: 400 }
      )
    }

    // In production, make actual Razorpay API call
    // const Razorpay = require('razorpay')
    // const razorpay = new Razorpay({
    //   key_id: RAZORPAY_KEY_ID,
    //   key_secret: RAZORPAY_KEY_SECRET
    // })
    
    // const order = await razorpay.orders.create({
    //   amount: amount,
    //   currency: currency || "INR",
    //   receipt: referenceId,
    //   notes: {
    //     division,
    //     paymentType,
    //     customerEmail,
    //     customerPhone
    //   }
    // })

    // For demo purposes, create a mock order
    const orderId = `order_${crypto.randomBytes(12).toString("hex")}`

    // Store order details in database
    console.log("Order created:", {
      orderId,
      amount,
      currency: currency || "INR",
      referenceId,
      division,
      paymentType,
      customerEmail,
      customerPhone
    })

    return NextResponse.json({
      success: true,
      orderId,
      amount,
      currency: currency || "INR",
      keyId: RAZORPAY_KEY_ID
    })

  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    )
  }
}
