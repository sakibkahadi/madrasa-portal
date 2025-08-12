// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { rootDomain } from "./lib/utils";

function extractSubdomain(req){
  // "http://localhost:3000/"
  const url = req.url;
  

  //  dynamicDomainName.localhost:3000
  const host = req.headers.get('host') || '';


  //  dynamicDomainName.localhost
  const hostname = host.split(':')[0];

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
   
    if (fullUrlMatch && fullUrlMatch[1]) {
     
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0]; 


  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);
    console.log('isSubdomain:', isSubdomain, 'hostname:', hostname, 'rootDomain:', rootDomainFormatted);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export async function middleware(req) {
   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
   const subdomain = extractSubdomain(req);

  if (subdomain) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, req.url));
    }
  }
 

  const publicRoutes = ["/login", "/register", "/forgot-password"];
  const isAuthRoute = publicRoutes.includes(pathname) || pathname.startsWith("/auth");

  const isPublicAsset =
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api/");

  if (isPublicAsset) {
    return NextResponse.next();
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

 

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};