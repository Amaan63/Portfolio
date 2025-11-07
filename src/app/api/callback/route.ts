import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.json({ error: "No code found" });

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
  });

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID! + ":" + process.env.SPOTIFY_CLIENT_SECRET!
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await res.json();

  console.log("✅ ACCESS TOKEN:", data.access_token);
  console.log("🔁 REFRESH TOKEN:", data.refresh_token);

  return NextResponse.json({
    success: true,
    message: "Check your terminal — copy the refresh token into your .env.local",
    data,
  });
}
