import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const { client } = await connectToDatabase();
    const db = client.db('MAIC');
    
    if (id) {
      // Get single announcement: /api/announcements?id=123
      const announcement = await db.collection('announcements')
        .findOne({ _id: new ObjectId(id) });
      
      if (!announcement) {
        return NextResponse.json({ 
          success: false, 
          error: 'Announcement not found' 
        }, { status: 404 });
      }
      
      return NextResponse.json({ success: true, data: announcement });
    } else {
      // Get all active, non-expired announcements: /api/announcements
      const now = new Date();
      const announcements = await db.collection('announcements')
        .find({
          isActive: true,
          $or: [
            { expiresAt: { $gt: now } },
            { expiresAt: null },
            { expiresAt: { $exists: false } }
          ]
        })
        .sort({ priority: 1, createdAt: -1 })
        .toArray();
      return NextResponse.json({ success: true, data: announcements });
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db('MAIC');
    
    // Validate required fields
    if (!body.title || !body.message) {
      return NextResponse.json({ 
        success: false, 
        error: 'Title and message are required' 
      }, { status: 400 });
    }
    
    const result = await db.collection('announcements').insertOne({
      ...body,
      createdAt: new Date()
    });
    
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

