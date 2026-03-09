import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // params is a Promise
) {
    const { id } = await params; // ✅ unwrap the promise

    try {
        const body = await request.json();
        const { db } = await connectToDatabase();

        const result = await db.collection("announcements").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: body },
            { returnDocument: "after" }
        );

        if (!result.value) {
            return NextResponse.json(
                { success: false, error: "Announcement not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: { ...result.value, _id: result.value._id.toString() },
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: err instanceof Error ? err.message : "Unknown" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params; // ✅ unwrap

    try {
        const { db } = await connectToDatabase();
        const result = await db
            .collection("announcements")
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { success: false, error: "Announcement not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: err instanceof Error ? err.message : "Unknown" },
            { status: 500 }
        );
    }
}