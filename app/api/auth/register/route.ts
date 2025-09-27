
import { NextResponse } from 'next/server';
import admin from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    return NextResponse.json({ user: userRecord });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
