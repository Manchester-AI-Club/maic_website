import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    
    if (!collection) {
      return NextResponse.json({ 
        success: false, 
        error: 'Collection parameter is required' 
      }, { status: 400 });
    }

    const { client } = await connectToDatabase();
    const db = client.db('MAIC');
    const data = await db.collection(collection).find({}).toArray();
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    
    if (!collection) {
      return NextResponse.json({ 
        success: false, 
        error: 'Collection parameter is required' 
      }, { status: 400 });
    }

    const body = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db('MAIC');
    
    const result = await db.collection(collection).insertOne({
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