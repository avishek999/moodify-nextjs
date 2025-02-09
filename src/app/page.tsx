import { auth, signOut } from "@/libs/auth";

import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { getSpotifyToken } from "./api/api";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  getSpotifyToken();
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

  return (
    <>
      <div>Hello {session.user?.name}</div>

      {session.user?.image ? (
        <Image width={100} height={100} src={session.user?.image} alt="" />
      ) : (
        <h1>no imgs</h1>
      )}
      <div>You are sign in as User</div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >

        
        <button>sign out</button>
      </form>
    </>
  );
};

export default page;
