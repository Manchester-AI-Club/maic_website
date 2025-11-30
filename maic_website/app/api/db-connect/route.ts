import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';


// // Get any collection
// fetch('/api/YourCollectionName')

// // Add to any collection
// fetch('/api/YourCollectionName', {
//   method: 'POST',
//   body: JSON.stringify({ field1: 'value1', field2: 'value2' })
// })


export async function GET() {
  try {
    const { client, db } = await connectToDatabase();
    await db.admin().command({ ping: 1 });
    
    return NextResponse.json({ 
      success: true, 
      message: "MongoDB connected successfully" 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: "Connection failed", 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}