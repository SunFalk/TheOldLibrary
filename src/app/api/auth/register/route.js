import { NextResponse as res} from 'next/server';
import db from '@utils/db';
import { createSession } from '@/utils/session';

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();
        const [result] = await db.query(
            `SELECT email, username FROM users WHERE email = ? OR username = ? AND id > 0;`,
            [email, username]);
        let message = '';
        if (result.length > 0) {
            if (result[0].email === email) {
                message = "The email is already in use";
            } else if (result[0].username === username) {
                message = "The username is already in use"
            };
            return res.json({result: "FAILED", message: message}, {status: 409});
        } else {
            const [result] = await db.query(
                `INSERT INTO users (email, username, password) VALUES (?, ?, ?);`,
                [email, username, password]);
            console.log("In Register, result is: ", result);
            if (result.affectedRows > 0) {
                const [result1] = await db.query(`SELECT id FROM users WHERE username = ? AND email = ? AND password = ?;`, [username, email, password])
                await createSession(result1[0]?.id)
                return res.json({result: "SUCCESS", message: ''}, {status: 201});
            }
        }
    } catch (err) {
        console.log(err)
        return res.json({result: "FAILED", message: ''}, {status: 500});
    }
}

