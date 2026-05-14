import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
  }

  try {
    const { name, email, message, hp } = await request.json();

    // 1. Honeypot check
    if (hp) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
    }

    // 2. Length validation
    if (!name || name.length > 100 || !message || message.length > 2000) {
      return NextResponse.json({ error: 'Invalid input length' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['thekingsman2525@gmail.com'], // From your screenshot
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br/>')}
          </div>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
