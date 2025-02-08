"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewChatModal() {
  const router = useRouter();

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Page Version</h2>
        <p>Enter details for your new chat.</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => router.back()}
        >
          Close
        </button>
      </div>
    </div>
  );
}
