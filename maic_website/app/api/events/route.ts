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
      // Get single event: /api/events?id=123
      const event = await db.collection('events')
        .findOne({ _id: new ObjectId(id) });
      
      if (!event) {
        return NextResponse.json({ 
          success: false, 
          error: 'Event not found' 
        }, { status: 404 });
      }
      
      return NextResponse.json({ success: true, data: event });
    } else {
      // Get all events: /api/events
      const events = await db.collection('events')
        .find({})
        .sort({ date: -1 })
        .toArray();
      return NextResponse.json({ success: true, data: events });
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
    if (!body.title || !body.date) {
      return NextResponse.json({ 
        success: false, 
        error: 'Title and date are required' 
      }, { status: 400 });
    }
    
    const result = await db.collection('events').insertOne({
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

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID parameter is required' 
      }, { status: 400 });
    }
    
    const body = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db('MAIC');
    
    const result = await db.collection('events').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...body, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Event not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID parameter is required' 
      }, { status: 400 });
    }
    
    const { client } = await connectToDatabase();
    const db = client.db('MAIC');
    
    const result = await db.collection('events')
      .deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Event not found' 
      }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
