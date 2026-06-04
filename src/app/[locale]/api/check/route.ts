import {  NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if(!token) return new Response('登录失效', {
        status: 401
    })

    return Response.json({})
    
}