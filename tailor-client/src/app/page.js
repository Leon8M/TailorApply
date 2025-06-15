"use client";
import Auth from "./components/Auth";
import { auth } from "./lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ResumeGenerator from "./components/ResumeGenerator";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center p-6 bg-gray-900 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Error</h2>
          <p className="mb-4">Failed to load authentication state</p>
          <p className="text-sm text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {user ? (
        <div className="container mx-auto py-12 px-4">
          <ResumeGenerator />
        </div>
      ) : (
        <Auth />
      )}
    </main>
  );
}