import { NextResponse } from 'next/server'
import jsonwebtoken from 'jsonwebtoken'
import { encrypt } from '@/utils/auth'
import { cookies } from 'next/headers'


export async function POST(
    request: Request,
    { params: { auth } }: { params: { auth: string } }
  ) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET environment variable is not set');
      return NextResponse.json({ data: null, msg: '服务器配置错误' }, { status: 500 });
    }

    const { email, pwd } = await request.json();

    const en_pwd = encrypt(pwd);

     let info = {
      email,
      role: 1
    }

    const token = jsonwebtoken.sign(
        info,
        jwtSecret,
        { expiresIn: '3d' }
    );
    
    const oneDay = 3 * 24 * 60 * 60 * 1000;
    const cookieStore = await cookies();
    cookieStore.set('token', token, { httpOnly: true, expires: Date.now() + oneDay })

    if(auth === 'login') {
      return NextResponse.json({data: { email, pwd: en_pwd }, msg: '登录成功'})
    }

    if(auth === 'register') {
      return NextResponse.json({data: { email, pwd: en_pwd }, msg: '注册成功'})
    }
    
    return NextResponse.json({ data: null, msg: '无效的请求' }, { status: 400 });
}