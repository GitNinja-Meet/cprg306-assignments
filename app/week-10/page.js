"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <main className="container mx-auto p-4">
      {!user ? (
        <div className="text-center">
          <h1 className="text-2xl mb-4">Welcome to the Shopping List App</h1>
          <button
            onClick={gitHubSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login with GitHub
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl mb-4">
            Welcome, {user.displayName} ({user.email})
          </h1>
          <button
            onClick={firebaseSignOut}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
          <Link href="/week-9/shopping-list">
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
              Go to Shopping List
            </button>
          </Link>
        </div>
      )}
    </main>
  );
}
