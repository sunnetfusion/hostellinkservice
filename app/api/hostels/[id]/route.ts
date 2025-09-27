import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const hostel = await prisma.hostel.findUnique({
      where: {
        id: id,
      },
    });

    if (!hostel) {
      return NextResponse.json({ error: 'Hostel not found' }, { status: 404 });
    }

    return NextResponse.json(hostel);
  } catch (error) {
    console.error('Error fetching hostel:', error);
    return NextResponse.json({ error: 'Failed to fetch hostel' }, { status: 500 });
  }
}
