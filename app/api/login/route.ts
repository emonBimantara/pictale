import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        const resp = await fetch('https://story-api.dicoding.dev/v1/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({ email, password }),
        })

        if (!resp.ok) {
            return NextResponse.json(
                { error: true, message: `Server status: ${resp.status}` },
                { status: resp.status }
            )
        }

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
            secure: true, 
            sameSite: 'lax',
            path: '/',
            maxAge: 86400,
        })

        return response

    } catch (error: any) {
        console.error("Internal Server Error Log:", error)
        return NextResponse.json(
            { error: true, message: error.message || "Internal Server Error" },
            { status: 500 }
        )
    }
}