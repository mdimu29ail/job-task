import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb';
import Topic from '../../../../models/topic';

// GET one topic
export async function GET(request, { params }) {
  await connectMongoDB();
  const topic = await Topic.findById(params.id);
  return NextResponse.json({ topic });
}

// PUT (update)
export async function PUT(request, { params }) {
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(params.id, { title, description });
  return NextResponse.json({ message: 'Topic updated successfully' });
}

// DELETE
export async function DELETE(request, { params }) {
  await connectMongoDB();
  await Topic.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Topic deleted successfully' });
}
