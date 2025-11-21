import { NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";

export async function GET(req: Request) {
  try {
    // Get query params if passed via Postman
    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get("client_id") || process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret = searchParams.get("client_secret") || process.env.SPOTIFY_CLIENT_SECRET!;
    const refreshToken = searchParams.get("refresh_token") || process.env.SPOTIFY_REFRESH_TOKEN!;

    // Spotify API requires base64 encoded client credentials
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    // Request new access token using refresh token
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch top 5 tracks
    const topTracks = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json({
      success: true,
      total: topTracks.data.items.length,
      tracks: topTracks.data.items.map((t: any) => ({
        name: t.name,
        artist: t.artists.map((a: any) => a.name).join(", "),
        album: t.album.name,
        duration_ms: t.duration_ms,
        preview_url: t.preview_url,
        image: t.album.images[0]?.url,
      })),
    });
  } catch (error: any) {
    console.error("Spotify API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch top tracks", details: error.response?.data },
      { status: 500 }
    );
  }
}
