import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { projectEnquiries } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          error: 'Valid ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    // Query single enquiry by ID
    const enquiry = await db
      .select()
      .from(projectEnquiries)
      .where(eq(projectEnquiries.id, parseInt(id)))
      .limit(1);

    // Check if enquiry exists
    if (enquiry.length === 0) {
      return NextResponse.json(
        {
          error: 'Enquiry not found',
          code: 'NOT_FOUND',
        },
        { status: 404 }
      );
    }

    // Return the enquiry
    return NextResponse.json(enquiry[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + (error as Error).message,
      },
      { status: 500 }
    );
  }
}