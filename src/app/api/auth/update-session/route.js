import { NextResponse as res} from 'next/server';
import { updateExpires } from '@/utils/session';

export async function GET(req) {
    try {
        await updateExpires();
        return res.json({status: 200});
    } catch(err) {
        console.log(err);
        return res.json({status: 500})
    }
}