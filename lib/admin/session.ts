export const ADMIN_COOKIE_NAME = "hitts_admin_session";

type AdminSessionPayload = {
  email: string;
  exp: number;
};

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

function encodeBase64Url(value: string) {
  return btoa(value)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function decodeBase64Url(value: string) {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");

  return atob(padded);
}

async function sign(value: string) {
  const secret = getAdminSecret();

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminSessionValue(email: string) {
  const payload: AdminSessionPayload = {
    email,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSession(value?: string | null) {
  if (!value) return null;

  const [encodedPayload, signature] = value.split(".");

  if (!encodedPayload || !signature) return null;

  try {
    const expectedSignature = await sign(encodedPayload);

    if (expectedSignature !== signature) return null;

    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as AdminSessionPayload;

    if (!payload.email || payload.exp < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

export function getAdminCookieMaxAge() {
  return SESSION_MAX_AGE_SECONDS;
}
