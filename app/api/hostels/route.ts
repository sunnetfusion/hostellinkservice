
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  try {
    if (query) {
      const filteredHostels = await prisma.hostel.findMany({
        where: {
          AND: [
            { isVerified: true },
            { name: { contains: query, mode: 'insensitive' } },
          ],
        },
      });
      return NextResponse.json(filteredHostels);
    } else {
      const approvedHostels = await prisma.hostel.findMany({
        where: {
          isVerified: true,
        },
      });
      return NextResponse.json(approvedHostels);
    }
  } catch (error) {
    console.error('Error fetching approved hostels:', error);
    return NextResponse.json({ error: 'Failed to fetch approved hostels' }, { status: 500 });
  }
}
