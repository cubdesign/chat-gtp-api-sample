import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/index", "/api/chat"],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  const isBasicAuth = process.env.BASIC_AUTH === "true" ? true : false;
  const basicAuthUser = process.env.BASIC_AUTH_USER;
  const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!isBasicAuth) {
    return NextResponse.next();
  }

  if (basicAuthUser === undefined || basicAuthPassword === undefined) {
    url.pathname = "/api/basic-auth";
    return NextResponse.rewrite(url);
  }

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === basicAuthUser && pwd === basicAuthPassword) {
      return NextResponse.next();
    }
  }
  url.pathname = "/api/basic-auth";

  return NextResponse.rewrite(url);
}
