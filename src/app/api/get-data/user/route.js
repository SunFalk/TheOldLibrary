import { NextResponse as res } from 'next/server';
import { getUserData } from '@/utils/session';

export async function GET(req) {
    const session = await getUserData();

    if (!session) return res.json({status: 401});

    return res.json({username: session.username, email: session.email}, {status: 200});
}