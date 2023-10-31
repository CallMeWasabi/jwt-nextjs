import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
    if (!cookies().has("token")) {
        return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/home/:path*", ]
}