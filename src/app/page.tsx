"use client";
import HomePage from "@/components/home/HomePage";

// This is the component for the URL: "/"
export default function Page() {
  // The HomePage component itself should be refactored to use <Link>
  // so it no longer needs the onStart prop.
  return <HomePage />;
}
