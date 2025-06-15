"use client";
import Auth from "./components/Auth";
import { auth } from "./lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ResumeGenerator from "./components/ResumeGenerator";

export default function Home() {
  const [user] = useAuthState(auth);
  return user ? <ResumeGenerator /> : <Auth />;
}