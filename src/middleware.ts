import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    const isAdmin = request?.nextauth?.token?.role === "admin";
    const pathname = request?.nextUrl?.pathname;
    const isLogin = request?.nextauth?.token;
    if (
      (!isAdmin && pathname.includes("dashboard")) ||
      (!isAdmin && pathname.includes("api"))
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (!isLogin) {
      return NextResponse.redirect(new URL("/log-in", request.url));
    }
  },

  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/profile",
    "/api/:path*",
    "/orders/:path*",
    "/cart/:path*",
    "/dashboard/:path*",
  ],
};
