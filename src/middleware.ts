import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export default auth((req: NextRequest & { auth: any }) => {
    const isAuthenticated = !!req.auth;
    const isLoginPage = req.nextUrl.pathname.startsWith("/login");
    const isRecoverPage = req.nextUrl.pathname.startsWith("/recover");
    const isRegisterPage = req.nextUrl.pathname.startsWith("/register");

    if (isLoginPage || isRecoverPage || isRegisterPage) {
        if (isAuthenticated) {
            const userRole = req.auth?.user?.role;
            if (userRole === "warehouse") {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
            // If authenticated but wrong role, stay on login page to avoid loop
            return NextResponse.next();
        }
        return NextResponse.next();
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Secondary check for role
    const userRole = req.auth?.user?.role;
    if (userRole !== "warehouse") {
        return NextResponse.redirect(new URL("/login?error=AccessDenied", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
