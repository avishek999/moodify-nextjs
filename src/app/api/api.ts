export async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const url = "https://accounts.spotify.com/api/token";
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("client_id", clientId || "");
  body.append("client_secret", clientSecret || "");

  const requestOptions: RequestInit = {
    method: "POST",
    headers: headers,
    body: body.toString(),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("session data", data);
    return data;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
  }
}

// Call the function
const tokenData = await getSpotifyToken();
if (tokenData && tokenData.access_token) {
    const artistUrl = "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb";
    const artistRequestOptions: RequestInit = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${tokenData.access_token}`
        }
    };

    try {
        const artistResponse = await fetch(artistUrl, artistRequestOptions);
        if (!artistResponse.ok) {
            throw new Error(`HTTP error! status: ${artistResponse.status}`);
        }
        const artistData = await artistResponse.json();
        console.log("Artist data", artistData);
    } catch (error) {
        console.error("Error fetching artist data:", error);
    }
} else {
    console.error("Failed to retrieve access token");
}
