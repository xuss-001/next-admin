import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jsonwebtoken from 'jsonwebtoken'

export async function GET(req: NextRequest) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET environment variable is not set');
        return NextResponse.json({ data: null, msg: '服务器配置错误' }, { status: 500 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if(!token) return NextResponse.json({ data: null, msg: '登录失效' }, {
        status: 401
    })

    try {
        const decoded = jsonwebtoken.verify(token.value, jwtSecret) as { email: string; role: number };
        return NextResponse.json({ 
            data: { 
                email: decoded.email, 
                role: decoded.role 
            }, 
            msg: '' 
        });
    } catch (err) {
        return NextResponse.json({ data: null, msg: '登录失效' }, { status: 401 });
    }
}