import { auth, signIn } from "@/libs/auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify");
      }}
    >
      <button className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">
        Continue with Spotify
      </button>
    </form>
  );
};

export default Page;
