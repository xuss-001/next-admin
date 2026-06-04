import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if(!token) return NextResponse.json({ data: null, msg: '登录失效' }, {
        status: 401
    })

    return NextResponse.json({ data: {}, msg: '' })
    
}