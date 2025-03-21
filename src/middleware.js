import { NextResponse as res } from 'next/server';
import { cookies } from 'next/headers';

async function hasSession() {
    const cookieStore = await cookies();
    return cookieStore.get('session-token')?.value ? true : false;
}

async function updateSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session-token');

    if (!session) {
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/auth/update-session", {
            method: 'GET',
            headers: {
                "Cookie" : cookieStore.toString()
            }
        });
    } catch(err) {
        console.log(err);
        return;
    }
}

export async function middleware(req) {
    console.log("Middleware started...")

    await updateSession();

    const url = req.nextUrl.pathname;
    
    if (url.startsWith('/user/') && await hasSession()) {
        return res.next();
    }

    return res.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)',
}