"use client";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

export default function Auth() {
  const [error, setError] = useState(null);

  const signIn = async () => {
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Auth error:", err);
      setError("Failed to sign in. Please try again or check your popup settings.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-white">TailorApply</h1>
      <button
        onClick={signIn}
        className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-gray-700 hover:to-gray-600 group"
      >
        <span className="relative z-10">Sign in with Google</span>
        <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
      {error && (
        <p className="mt-4 text-red-400 text-sm max-w-md text-center">{error}</p>
      )}
    </div>
  );
}