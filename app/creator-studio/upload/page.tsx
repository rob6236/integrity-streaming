"use client";

import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "@/lib/firebase";

export default function UploadPage() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  const [msg, setMsg] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first");
      return;
    }

    const bucket = (storage as any)?.app?.options?.storageBucket;
    console.log("Auth UID:", user.uid);
    console.log("Using bucket:", bucket);

    const path = `uploads/${user.uid}/${Date.now()}-${file.name}`;
    const objectRef = ref(storage, path);

    setMsg(`Starting upload to: ${path}`);
    setUploading(true);
    setProgress(0);

    const uploadTask = uploadBytesResumable(objectRef, file, { contentType: file.type });

    uploadTask.on(
      "state_changed",
      (snap) => {
        const pct = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        console.log("state:", snap.state, pct + "%");
        setProgress(pct);
      },
      (error) => {
        console.error("Upload error:", error);
        setMsg(`Error: ${error.message}`);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("Complete. URL:", url);
        setDownloadURL(url);
        setMsg("Upload complete.");
        setUploading(false);
      }
    );
  };

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <h2>Upload Test</h2>
      <p style={{ opacity: 0.7, marginTop: -10 }}>
        Bucket: {(storage as any)?.app?.options?.storageBucket || "N/A"}
      </p>
      <input type="file" onChange={handleFileUpload} />
      <p>{uploading ? `Uploading... ${progress}%` : `Progress: ${progress}%`}</p>
      {msg && <p style={{ opacity: 0.9 }}>{msg}</p>}
      {downloadURL && (
        <p>
          File uploaded!{" "}
          <a href={downloadURL} target="_blank" rel="noreferrer">
            View file
          </a>
        </p>
      )}
    </div>
  );
}
