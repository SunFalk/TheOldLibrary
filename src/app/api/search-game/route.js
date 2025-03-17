import { NextResponse as res} from 'next/server';
import db from '@utils/db';

export async function POST(req) {
    try {
        const { search } = await req.json();
        const searchExp = '%' + search + '%';
        const [result] = await db.query(`SELECT * FROM games WHERE name LIKE ?`, [searchExp]);
        return res.json(result, {status: 200});
    } catch(err) {
        console.log(err);
        return res.json({result: "FAILED", message: ''}, {status: 500});
    }
}