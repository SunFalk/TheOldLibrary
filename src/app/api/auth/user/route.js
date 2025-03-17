import { NextResponse as res} from 'next/server';
import { getSession} from '@/utils/session';


export async function GET(req) {
    const session = await getSession();

    if (!session) {
        return res.json({status: 401})
    }

    return res.json({status: 200});
}