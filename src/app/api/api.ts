const SpotifyClientID = process.env.SPOTIFY_CLIENT_ID;
const SpotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const getAccessToken = async (authCode: string) => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${SpotifyClientID}:${SpotifyClientSecret}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: authCode, // Authorization code received from login
        redirect_uri: "YOUR_REDIRECT_URI", // Must match the one used during authentication
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get access token");
    }

    const data = await response.json();
    console.log("Access Token:", data.access_token);
    return data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};
