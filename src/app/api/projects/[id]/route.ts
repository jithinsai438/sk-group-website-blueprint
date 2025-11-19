import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';

const VALID_DIVISIONS = ['construction', 'legal', 'pr', 'events', 'tissue'];
const VALID_STATUSES = ['Completed', 'Ongoing'];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const project = await db
      .select()
      .from(projects)
      .where(eq(projects.id, parseInt(id)))
      .limit(1);

    if (project.length === 0) {
      return NextResponse.json(
        { error: 'Project not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(project[0], { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, division, description, status, location, duration, image, tags } = body;

    // Validate division if provided
    if (division && !VALID_DIVISIONS.includes(division)) {
      return NextResponse.json(
        {
          error: `Invalid division. Must be one of: ${VALID_DIVISIONS.join(', ')}`,
          code: 'INVALID_DIVISION',
        },
        { status: 400 }
      );
    }

    // Validate status if provided
    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
          code: 'INVALID_STATUS',
        },
        { status: 400 }
      );
    }

    // Build update object with only provided fields
    const updates: any = {
      updatedAt: new Date().toISOString(),
    };

    if (title !== undefined) updates.title = title.trim();
    if (division !== undefined) updates.division = division;
    if (description !== undefined) updates.description = description.trim();
    if (status !== undefined) updates.status = status;
    if (location !== undefined) updates.location = location.trim();
    if (duration !== undefined) updates.duration = duration.trim();
    if (image !== undefined) updates.image = image;
    if (tags !== undefined) updates.tags = tags;

    const updated = await db
      .update(projects)
      .set(updates)
      .where(eq(projects.id, parseInt(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Project not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if project exists
    const existing = await db
      .select()
      .from(projects)
      .where(eq(projects.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Project not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(projects)
      .where(eq(projects.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Project deleted successfully',
        project: deleted[0],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}