import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { projectEnquiries, projects } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

const VALID_DIVISIONS = ['construction', 'legal', 'pr', 'events', 'tissue'];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const division = searchParams.get('division');
    const projectId = searchParams.get('projectId');

    let query = db.select().from(projectEnquiries);

    const conditions = [];

    if (division) {
      conditions.push(eq(projectEnquiries.division, division));
    }

    if (projectId) {
      const projectIdInt = parseInt(projectId);
      if (!isNaN(projectIdInt)) {
        conditions.push(eq(projectEnquiries.projectId, projectIdInt));
      }
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, division, message, projectId } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { error: 'Email is required', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return NextResponse.json(
        { error: 'Phone is required', code: 'MISSING_PHONE' },
        { status: 400 }
      );
    }

    if (!division || typeof division !== 'string' || division.trim() === '') {
      return NextResponse.json(
        { error: 'Division is required', code: 'MISSING_DIVISION' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required', code: 'MISSING_MESSAGE' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone.trim();
    const sanitizedDivision = division.trim().toLowerCase();
    const sanitizedMessage = message.trim();

    // Validate email format (basic check)
    if (!sanitizedEmail.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }

    // Validate division enum
    if (!VALID_DIVISIONS.includes(sanitizedDivision)) {
      return NextResponse.json(
        {
          error: `Division must be one of: ${VALID_DIVISIONS.join(', ')}`,
          code: 'INVALID_DIVISION',
        },
        { status: 400 }
      );
    }

    // Validate projectId if provided
    let validatedProjectId = null;
    if (projectId !== undefined && projectId !== null) {
      const projectIdInt = parseInt(projectId);
      if (isNaN(projectIdInt)) {
        return NextResponse.json(
          { error: 'Invalid project ID format', code: 'INVALID_PROJECT_ID' },
          { status: 400 }
        );
      }

      // Check if project exists
      const existingProject = await db
        .select()
        .from(projects)
        .where(eq(projects.id, projectIdInt))
        .limit(1);

      if (existingProject.length === 0) {
        return NextResponse.json(
          { error: 'Project not found', code: 'PROJECT_NOT_FOUND' },
          { status: 400 }
        );
      }

      validatedProjectId = projectIdInt;
    }

    // Create enquiry
    const newEnquiry = await db
      .insert(projectEnquiries)
      .values({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        division: sanitizedDivision,
        message: sanitizedMessage,
        projectId: validatedProjectId,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newEnquiry[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}