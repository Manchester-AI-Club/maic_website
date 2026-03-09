import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET /api/announcements
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const announcements = await db
        .collection("announcements")
        .find()
        .sort({ order: 1, createdAt: -1 }) // sort by order first
        .toArray();

    return NextResponse.json({ success: true, data: announcements });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
        { success: false, error: "Failed to fetch announcements" },
        { status: 500 }
    );
  }
}

// POST /api/announcements
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.message) {
      return NextResponse.json(
          { success: false, error: "Title and message required" },
          { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Determine next order value
    const last = await db
        .collection("announcements")
        .find()
        .sort({ order: -1 })
        .limit(1)
        .toArray();

    const nextOrder = last.length > 0 ? last[0].order + 1 : 0;

    const result = await db.collection("announcements").insertOne({
      ...body,
      createdAt: new Date(),
      order: nextOrder,
    });

    const announcement = await db
        .collection("announcements")
        .findOne({ _id: result.insertedId });

    return NextResponse.json({ success: true, data: announcement });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
        { success: false, error: err instanceof Error ? err.message : "Unknown" },
        { status: 500 }
    );
  }
}