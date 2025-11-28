"use client";

import { useState } from "react";
import { uploadPublishedWithCache } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { addMediaItem } from "@/lib/mediaLibrary";

export default function UploadPage() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("You must be logged in to upload.");

      setMessage("Uploading...");
      setProgress(0);

      // Upload to your Firebase helper (existing behavior)
      const url = await uploadPublishedWithCache(file, user.uid);

      // After successful upload, register it in the shared media library
      const id = `${Date.now()}-${file.name}`;
      const type: "video" | "audio" = file.type.startsWith("audio")
        ? "audio"
        : "video";

      addMediaItem({
        id,
        name: file.name,
        url,
        type,
        createdAt: Date.now(),
      });

      setProgress(100);
      setMessage("Upload complete! Media added to Editor media pool.");
    } catch (error: any) {
      console.error(error);
      setMessage(`Upload failed: ${error.message}`);
      setProgress(0);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#7B0F24",
        color: "#FFF9F0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: 24,
          fontWeight: 800,
          marginBottom: 12,
        }}
      >
        Upload
      </h2>

      <p
        style={{
          fontSize: 13,
          opacity: 0.9,
          marginBottom: 12,
        }}
      >
        Any media you upload here will automatically appear in the Editor&apos;s
        media pool for this browser session.
      </p>

      <input
        type="file"
        onChange={handleFileUpload}
        style={{
          marginBottom: 12,
        }}
      />

      {progress > 0 && (
        <div
          style={{
            width: 220,
            height: 6,
            borderRadius: 9999,
            border: "1px solid #FFD700",
            overflow: "hidden",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#FFD700",
            }}
          />
        </div>
      )}

      <p
        style={{
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {message}
      </p>
    </div>
  );
}
