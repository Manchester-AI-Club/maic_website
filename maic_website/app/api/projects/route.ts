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
      // Get single project: /api/projects?id=123
      const project = await db.collection('projects')
        .findOne({ _id: new ObjectId(id) });
      
      if (!project) {
        return NextResponse.json({ 
          success: false, 
          error: 'Project not found' 
        }, { status: 404 });
      }
      
      return NextResponse.json({ success: true, data: project });
    } else {
      // Get all projects: /api/projects
      const projects = await db.collection('projects')
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json({ success: true, data: projects });
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
    if (!body.title || !body.description) {
      return NextResponse.json({ 
        success: false, 
        error: 'Title and description are required' 
      }, { status: 400 });
    }
    
    const result = await db.collection('projects').insertOne({
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
    
    const result = await db.collection('projects').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...body, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Project not found' 
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
    
    const result = await db.collection('projects')
      .deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Project not found' 
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
