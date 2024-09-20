"use client"
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center bg-skin-card text-skin-base py-2 px-8 rounded-md shadow-md">
      <FontAwesomeIcon icon={faArrowLeft} className="mr-2"/>
      Back
    </button>
  );
}
