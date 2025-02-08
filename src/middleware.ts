import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest): Promise<NextResponse> {

    if(request.method === "GET") {
        const response = NextResponse.next();
        const token = (await cookies()).get("session")?.value;

        if(!token) return NextResponse.redirect(new URL("/login", request.url));

        const cookieStore = await cookies();
        cookieStore.set("session", token, {
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // reset cookie on login success
            sameSite: "lax",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });
        
        return response;
    }

    // CSRF protection
    const originHeader = request.headers.get("Origin"); // get origin
    const hostHeader = request.headers.get("Host"); // get host

    if(originHeader === null || hostHeader === null) {
        return new NextResponse(null, { status: 403 });
    }

    let origin: URL;

    try {
        origin = new URL(originHeader);
    } catch {
        return new NextResponse(null, { status: 403 });
    }

    if(origin.host !== hostHeader) {
        return new NextResponse(null, { status: 403 });
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - login
       * - sign-up
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * Feel free to modify this pattern to include more paths.
       */
      '/((?!sign-up|login|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}