import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/crm"];

export function middleware(request: NextRequest) {
  const isProtected = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Supabase auth can be enforced here once the project credentials are configured.
  return NextResponse.next({
    headers: {
      "x-cx-auth-mode": "prepared"
    }
  });
}

export const config = {
  matcher: ["/crm/:path*"]
};
