import { NextResponse } from 'next/server';
import connectMongoDB from '../../../libs/mongodb';
import Topic from '../../../models/topic';

// GET all topics
export async function GET() {
  await connectMongoDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics });
}

// POST a new topic
export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description });
  return NextResponse.json(
    { message: 'Topic created successfully' },
    { status: 201 }
  );
}
