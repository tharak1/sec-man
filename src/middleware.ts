import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

interface DecodedToken {
  id: string;
  isAdmin: boolean;
}

export const config = {
  matcher: ['/', '/login', '/signup'],
};

const verifyJWT = async (token: string, secret: string) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload as unknown;
  } catch (error:any) {
    console.error('JWT verification failed:', error.message);
    return null;
  }
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup' || path ==='/' ;

  const token = request.cookies.get('token')?.value;

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (path === '/') {
    if(token){
      const decodedToken = await verifyJWT(token, process.env.TOKEN_SECRET!) as DecodedToken;

      if (decodedToken) {
        if (isPublicPath) {
          if (decodedToken.isAdmin) {
            return NextResponse.redirect(new URL('/sites_display', request.nextUrl));
          } else {
            return NextResponse.redirect(new URL('/home', request.nextUrl));
          }
        }
      } else {
        // Invalid token, redirect to login
        return NextResponse.redirect(new URL('/login', request.nextUrl));
      }
    }else{
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
  }

  return NextResponse.next();
}

