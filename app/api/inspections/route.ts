import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { hostelId, studentId, inspectionDate } = await request.json();

    if (!hostelId || !studentId || !inspectionDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const inspection = await prisma.inspection.create({
      data: {
        hostelId,
        studentId,
        inspectionDate: new Date(inspectionDate),
      },
    });

    return NextResponse.json(inspection, { status: 201 });
  } catch (error) {
    console.error('Error creating inspection:', error);
    return NextResponse.json({ error: 'Failed to create inspection' }, { status: 500 });
  }
}
