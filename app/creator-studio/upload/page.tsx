"use client";

import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "@/lib/firebase";

export default function UploadPage() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first.");
      return;
    }

    setFileName(file.name);
    setUploading(true);
    setProgress(0);
    setMessage("");

    // ✅ This matches your Firebase rules: includes user UID in path
    const path = `uploads/published/${user.uid}/${Date.now()}-${file.name}`;
    const objectRef = ref(storage, path);

    const uploadTask = uploadBytesResumable(objectRef, file, {
      contentType: file.type,
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(percent);
      },
      (error) => {
        console.error("Upload error:", error);
        setMessage(`Error: ${error.message}`);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadURL(url);
        setMessage("✅ Upload complete and file is public.");
        setUploading(false);
      }
    );
  };

  return (
    <div
      style={{
        color: "white",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Upload</h2>

      <input
        type="file"
        onChange={handleFileUpload}
        style={{
          backgroundColor: "#FFD700",
          color: "#000",
          padding: "10px",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      />

      {fileName && (
        <p style={{ marginTop: "15px", fontSize: "1rem" }}>
          <strong>Uploading:</strong> {fileName}
        </p>
      )}

      {uploading && (
        <p style={{ fontSize: "1rem", marginTop: "5px" }}>
          Progress: {progress}%
        </p>
      )}

      {message && (
        <p style={{ marginTop: "10px", color: "#FFD700", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      {downloadURL && (
        <p style={{ marginTop: "15px" }}>
          <a
            href={downloadURL}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#00BFFF",
              textDecoration: "underline",
            }}
          >
            View Uploaded File (Public Link)
          </a>
        </p>
      )}
    </div>
  );
}
