import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { isVerified } = await request.json();

  try {
    const updatedHostel = await prisma.hostel.update({
      where: { id },
      data: { isVerified },
    });
    return NextResponse.json(updatedHostel);
  } catch (error) {
    console.error(`Error updating hostel ${id}:`, error);
    return NextResponse.json({ error: `Failed to update hostel ${id}` }, { status: 500 });
  }
}
