import { NextRequest, NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_API_URL = 'https://api.paystack.co';

export async function POST(req: NextRequest) {
  const { email, amount } = await req.json();

  try {
    const response = await fetch(`${PAYSTACK_API_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, amount: amount * 100 }), // Amount in kobo
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: 'Failed to initialize payment' }, { status: 500 });
    }

    return NextResponse.json(data.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to initialize payment' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference');

  try {
    const response = await fetch(`${PAYSTACK_API_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
    }

    return NextResponse.json(data.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
