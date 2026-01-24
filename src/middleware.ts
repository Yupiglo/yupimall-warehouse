import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export default auth((req: NextRequest & { auth: any }) => {
    const session = req.auth;
    const isAuthenticated = !!session;
    const { pathname } = req.nextUrl;

    const isLoginPage = pathname.startsWith("/login");
    const isRecoverPage = pathname.startsWith("/recover");
    const isRegisterPage = pathname.startsWith("/register");

    if (isLoginPage || isRecoverPage || isRegisterPage) {
        if (isAuthenticated) {
            const userRole = session?.user?.role;
            if (userRole === "warehouse") {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
            // If authenticated but wrong role, allow landing on login to see error or logout
            return NextResponse.next();
        }
        return NextResponse.next();
    }

    if (!isAuthenticated) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    // Secondary check for role
    const userRole = session?.user?.role;
    if (userRole !== "warehouse") {
        console.log("MIDDLEWARE_DEBUG: Access denied for role", userRole);
        return NextResponse.redirect(new URL("/login?error=AccessDenied", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};

