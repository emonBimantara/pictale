import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const resp = await fetch('https://story-api.dicoding.dev/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    const data = await resp.json()

    if (data.error) {
        return NextResponse.json(
            { error: true, message: data.message },
            { status: 400 }
        )
    }

    const response = NextResponse.json({ success: true })

    response.cookies.set('token', data.loginResult.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 86400,
    })

    return response
}