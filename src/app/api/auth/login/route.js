import { NextResponse as res } from 'next/server';
import db from '@utils/db';
import { createSession, destroySession } from '@/utils/session';

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const [result] = await db.query(
            `SELECT id FROM users WHERE email = ? AND password = ? AND id > 0;`,
            [email, password]);
        if (result.length > 0) {
            await destroySession();
            await createSession(result[0].id);

            return res.json({result: "VALID"}, {status: 200});
        } else {
            return res.json({result: "INVALID"}, {status: 401});
        }
    } catch (err) {
        console.log(err);
        return res.json({result: "ERROR", message: ''}, {status: 500});
    }
}