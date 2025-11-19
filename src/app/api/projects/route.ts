import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq, like, or, and } from 'drizzle-orm';

const VALID_DIVISIONS = ['construction', 'legal', 'pr', 'events', 'tissue'];
const VALID_STATUSES = ['Completed', 'Ongoing'];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const division = searchParams.get('division');

    let query = db.select().from(projects);
    const conditions = [];

    if (division) {
      if (!VALID_DIVISIONS.includes(division)) {
        return NextResponse.json({ 
          error: `Invalid division. Must be one of: ${VALID_DIVISIONS.join(', ')}`,
          code: 'INVALID_DIVISION'
        }, { status: 400 });
      }
      conditions.push(eq(projects.division, division));
    }

    if (search) {
      const searchCondition = or(
        like(projects.title, `%${search}%`),
        like(projects.description, `%${search}%`),
        like(projects.location, `%${search}%`)
      );
      conditions.push(searchCondition);
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, division, description, status, location, duration, image, tags } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ 
        error: 'Title is required',
        code: 'MISSING_TITLE'
      }, { status: 400 });
    }

    if (!division || !division.trim()) {
      return NextResponse.json({ 
        error: 'Division is required',
        code: 'MISSING_DIVISION'
      }, { status: 400 });
    }

    if (!VALID_DIVISIONS.includes(division)) {
      return NextResponse.json({ 
        error: `Invalid division. Must be one of: ${VALID_DIVISIONS.join(', ')}`,
        code: 'INVALID_DIVISION'
      }, { status: 400 });
    }

    if (!description || !description.trim()) {
      return NextResponse.json({ 
        error: 'Description is required',
        code: 'MISSING_DESCRIPTION'
      }, { status: 400 });
    }

    if (!status || !status.trim()) {
      return NextResponse.json({ 
        error: 'Status is required',
        code: 'MISSING_STATUS'
      }, { status: 400 });
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ 
        error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
        code: 'INVALID_STATUS'
      }, { status: 400 });
    }

    if (!location || !location.trim()) {
      return NextResponse.json({ 
        error: 'Location is required',
        code: 'MISSING_LOCATION'
      }, { status: 400 });
    }

    if (!duration || !duration.trim()) {
      return NextResponse.json({ 
        error: 'Duration is required',
        code: 'MISSING_DURATION'
      }, { status: 400 });
    }

    if (tags !== undefined && tags !== null && !Array.isArray(tags)) {
      return NextResponse.json({ 
        error: 'Tags must be an array',
        code: 'INVALID_TAGS'
      }, { status: 400 });
    }

    const now = new Date().toISOString();

    const insertData: any = {
      title: title.trim(),
      division: division.trim(),
      description: description.trim(),
      status: status.trim(),
      location: location.trim(),
      duration: duration.trim(),
      createdAt: now,
      updatedAt: now
    };

    if (image && image.trim()) {
      insertData.image = image.trim();
    }

    if (tags !== undefined && tags !== null) {
      insertData.tags = tags;
    }

    const newProject = await db.insert(projects)
      .values(insertData)
      .returning();

    return NextResponse.json(newProject[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}