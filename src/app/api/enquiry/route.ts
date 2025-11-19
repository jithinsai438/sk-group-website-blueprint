import { NextRequest, NextResponse } from "next/server"

// Division email mapping
const divisionEmails: Record<string, string> = {
  "Construction & Real Estate": "construction@skgroupconnections.in",
  "Legal Network": "legal@skgroupconnections.in",
  "PR Agency": "pr@skgroupconnections.in",
  "Event Management": "events@skgroupconnections.in",
  "Tissue Manufacturing & Distribution": "tissues@skgroupconnections.in"
}

// Generate reference ID
function generateReferenceId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `SK-${timestamp}-${random}`.toUpperCase()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const city = formData.get("city") as string
    const division = formData.get("division") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const file = formData.get("file") as File | null

    // Validate required fields
    if (!name || !email || !phone || !city || !division || !subject || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      )
    }

    // Generate reference ID
    const referenceId = generateReferenceId()

    // Get division-specific email
    const divisionEmail = divisionEmails[division] || "info@skgroupconnections.in"

    // In a production environment, you would:
    // 1. Send email to the division-specific email address
    // 2. Send confirmation email to the customer
    // 3. Store the enquiry in a database
    // 4. Handle file upload to cloud storage

    // For now, we'll simulate the process
    console.log("Enquiry received:", {
      referenceId,
      name,
      email,
      phone,
      city,
      division,
      divisionEmail,
      subject,
      message,
      hasFile: !!file
    })

    // Simulate email sending (in production, use nodemailer, SendGrid, etc.)
    // await sendEmailToCompany(divisionEmail, enquiryData)
    // await sendConfirmationToCustomer(email, referenceId)

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Enquiry submitted successfully"
    })

  } catch (error) {
    console.error("Error processing enquiry:", error)
    return NextResponse.json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    )
  }
}
