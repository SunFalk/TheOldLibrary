import { NextResponse as res} from 'next/server';
import db from '@utils/db';

export async function GET(req) {
    try {
        const [result] = await db.query(`SELECT * FROM games;`)
        console.log(result);
        return res.json(result, {status: 200});
    } catch(err) {
        console.log(err);
        return res.json({result: "FAILED", message: ''}, {status: 500});
    }
}

export async function POST(req) {
    return res.json({}, {status: 200});
}
