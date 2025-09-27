import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const unapprovedHostels = await prisma.hostel.findMany({
      where: {
        isVerified: false,
      },
    });
    return NextResponse.json(unapprovedHostels);
  } catch (error) {
    // During the build process, the database may not be available.
    // In that case, we can return an empty array to allow the build to succeed.
    if (error instanceof Error && error.message.includes("Can't reach database server")) {
      console.warn("Database not available, returning empty array for unapproved hostels. This is expected during build time.");
      return NextResponse.json([]);
    }
    console.error('Error fetching unapproved hostels:', error);
    return NextResponse.json({ error: 'Failed to fetch unapproved hostels' }, { status: 500 });
  }
}
