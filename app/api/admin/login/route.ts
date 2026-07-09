import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionValue,
  getAdminCookieMaxAge,
} from "@/lib/admin/session";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      {
        error: "Admin credentials are not configured",
      },
      {
        status: 500,
      }
    );
  }

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json(
      {
        error: "Invalid admin email or password",
      },
      {
        status: 401,
      }
    );
  }

  const sessionValue = await createAdminSessionValue(email);
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: sessionValue,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminCookieMaxAge(),
  });

  return response;
}
