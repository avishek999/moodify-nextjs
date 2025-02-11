import { auth, signOut } from "@/libs/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { getAccessToken } from "./api/api";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  // getAccessToken();
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
