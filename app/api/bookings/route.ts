import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { hostelId, studentId, moveInDate } = await request.json();

    if (!hostelId || !studentId || !moveInDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        hostelId,
        studentId,
        bookingDate: new Date(),
        moveInDate: new Date(moveInDate),
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
