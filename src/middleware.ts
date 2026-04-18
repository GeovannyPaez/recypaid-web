import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const redirectUrl = req.nextUrl.clone();

    const redirectTo = (path: string) => {
      redirectUrl.pathname = path;
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    };

    // Módulo de usuario web deshabilitado; gestión de usuario se hace en mobile.
    const isDisabledUserModulePath =
      pathname === "/dashboard/orders" ||
      pathname.startsWith("/dashboard/orders/") ||
      pathname === "/dashboard/recycling" ||
      pathname.startsWith("/dashboard/recycling/") ||
      pathname === "/dashboard/recyclable-materials" ||
      pathname.startsWith("/dashboard/recyclable-materials/") ||
      pathname === "/dashboard/profile" ||
      pathname.startsWith("/dashboard/profile/");

    if (isDisabledUserModulePath) {
      return redirectTo("/dashboard");
    }

    // Flujo picker legacy deshabilitado por completo.
    if (pathname === "/dashboard/picker" || pathname.startsWith("/dashboard/picker/")) {
      return redirectTo("/dashboard");
    }

    // Gestión legacy de pickers en admin deshabilitada.
    if (pathname === "/dashboard/admin/pickers" || pathname.startsWith("/dashboard/admin/pickers/")) {
      return redirectTo("/dashboard/admin/organizations");
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
