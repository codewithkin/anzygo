"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewChatModal() {
  const router = useRouter();

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] z-50">
        <h2 className="text-lg font-semibold mb-4">Start a New Chat</h2>
        
        <inputk
          type="text"
          placeholder="Enter username..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={() => router.back()} className="bg-gray-200 p-2 rounded">
            Cancel
          </button>
          <button className="bg-primary text-white p-2 rounded">Page version</button>
        </div>
      </div>
    </div>
  );
}
