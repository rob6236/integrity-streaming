"use client";

import { useState } from "react";
import { uploadPublishedWithCache } from "@/lib/firebase";
import { auth } from "@/lib/firebase";

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
      const url = await uploadPublishedWithCache(file, user.uid);
      setMessage(`Upload complete! Public URL: ${url}`);
    } catch (error: any) {
      console.error(error);
      setMessage(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <h2>Upload</h2>
      <input type="file" onChange={handleFileUpload} />
      <p>{message}</p>
    </div>
  );
}
