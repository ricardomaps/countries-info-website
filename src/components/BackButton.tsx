"use client"
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="bg-skin-card text-skin-base py-2 px-8 rounded-md shadow-md">Back</button>
  );
}
