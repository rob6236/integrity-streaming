// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app, db, storage } from "@/lib/firebase";

/* ---- Theme ---- */
const gold = "rgba(255,215,0,0.90)";
const goldSoft = "rgba(255,215,0,0.65)";
const ivory = "#FFF9F0";

const cardStyle: React.CSSProperties = {
  backdropFilter: "blur(4px)",
  background: "linear-gradient(180deg, rgba(0,0,0,0.16), rgba(0,0,0,0.28))",
  borderRadius: 16,
  border: `1px solid ${gold}`,
  boxShadow: "0 0 0 1px rgba(255,215,0,0.6), 0 0 16px rgba(255,215,0,0.25)",
};

type ProfileDoc = {
  name?: string;
  email?: string;
  createdAt?: Timestamp;
  avatarUrl?: string;
  channelImageUrl?: string;
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [channelImageUrl, setChannelImageUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState<"avatar" | "channel" | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUid(null);
        setLoading(false);
        return;
      }
      setUid(user.uid);
      setEmail(user.email ?? "");
      setName(user.displayName || "");

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data() as ProfileDoc;
          setName((prev) => prev || data.name || "");
          if (data.createdAt instanceof Timestamp) {
            setJoined(data.createdAt.toDate().toLocaleDateString());
          }
          if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
          if (data.channelImageUrl) setChannelImageUrl(data.channelImageUrl);
          if (!email && data.email) setEmail(data.email);
        }
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  /* ---------- Local validators ---------- */
  const validateImageFile = (file: File) => {
    const MAX_MB = 5;
    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      throw new Error("Please upload a PNG, JPG, or WEBP image.");
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      throw new Error(`Image must be under ${MAX_MB}MB.`);
    }
  };

  const readImageDimensions = (file: File): Promise<{ w: number; h: number }> =>
    new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        resolve({ w: img.width, h: img.height });
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        reject(new Error("Could not read image."));
        URL.revokeObjectURL(url);
      };
      img.src = url;
    });

  /* ---------- Upload handlers ---------- */
  const uploadToStorage = async (
    file: File,
    path: string
  ): Promise<string> => {
    const sref = storageRef(storage, path);
    await uploadBytes(sref, file, { contentType: file.type });
    return await getDownloadURL(sref);
  };

  const handleAvatarUpload = async (file: File) => {
    if (!uid) return;
    try {
      setErrorMsg(null);
      setBusy("avatar");
      validateImageFile(file);

      // Optional: ensure square-ish avatars look crisp
      const { w, h } = await readImageDimensions(file);
      if (w < 256 || h < 256) {
        throw new Error("Profile picture should be at least 256×256.");
      }

      const url = await uploadToStorage(file, `users/${uid}/avatar-${Date.now()}`);
      await setDoc(
        doc(db, "users", uid),
        { avatarUrl: url, updatedAt: serverTimestamp() },
        { merge: true }
      );
      setAvatarUrl(url);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to upload profile picture.");
    } finally {
      setBusy(null);
    }
  };

  const handleChannelUpload = async (file: File) => {
    if (!uid) return;
    try {
      setErrorMsg(null);
      setBusy("channel");
      validateImageFile(file);
      const { w, h } = await readImageDimensions(file);
      // Recommend banner aspect ratio like YouTube’s 16:9 (or similar)
      if (w < 1280 || h < 720) {
        throw new Error("Channel image should be at least 1280×720.");
      }

      const url = await uploadToStorage(
        file,
        `users/${uid}/channel-${Date.now()}`
      );
      await setDoc(
        doc(db, "users", uid),
        { channelImageUrl: url, updatedAt: serverTimestamp() },
        { merge: true }
      );
      setChannelImageUrl(url);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to upload channel image.");
    } finally {
      setBusy(null);
    }
  };

  /* ---------- Render ---------- */
  if (loading) {
    return (
      <main className="px-4" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <div style={{ opacity: 0.9 }}>Loading…</div>
      </main>
    );
  }

  if (!uid) {
    return (
      <main className="px-4" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <div style={{ ...cardStyle, padding: 24, maxWidth: 520, width: "100%" }}>
          <h1 className="text-2xl font-semibold mb-2">Profile</h1>
          <p className="opacity-85 mb-4">Please log in to view your profile.</p>
          <Link href="/login" className="gold-button" style={{ padding: "10px 14px", borderRadius: 12, display: "inline-block" }}>
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <div style={{ ...cardStyle, padding: 22, width: "100%", maxWidth: 920 }}>
        {/* Header strip: avatar + identity */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            columnGap: 16,
            paddingBottom: 14,
            borderBottom: `1px solid ${goldSoft}`,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 14,
              background: "#ffffff",
              overflow: "hidden",
              position: "relative",
              border: `1px solid ${goldSoft}`,
            }}
          >
            <Image
              src={avatarUrl || "/logo.png"}
              alt="Profile avatar"
              fill
              sizes="96px"
              style={{ objectFit: avatarUrl ? "cover" : "contain", transform: avatarUrl ? undefined : "scale(1.1)" }}
            />
          </div>

          <div>
            <h1
              style={{
                fontSize: 30,
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 4,
                color: ivory,
                textShadow: "0 1px 0 rgba(0,0,0,0.45), 0 0 12px rgba(255,215,0,0.22)",
              }}
            >
              {name || "Unnamed Creator"}
            </h1>
            <div style={{ opacity: 0.9 }}>{email}</div>
            {joined && <div style={{ opacity: 0.85, marginTop: 2 }}>Member since: {joined}</div>}
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div
            role="alert"
            style={{
              marginTop: 12,
              borderRadius: 10,
              border: "1px solid rgba(255,107,107,0.65)",
              background: "rgba(255,0,0,0.10)",
              padding: "10px 12px",
              fontSize: 14,
              color: "#ffd1d1",
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Upload sections */}
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gap: 16,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* Profile Picture */}
          <section style={{ ...cardStyle, padding: 16 }}>
            <h2 style={{ fontWeight: 800, marginBottom: 8 }}>Profile picture</h2>
            <p style={{ opacity: 0.9, fontSize: 14, marginBottom: 10 }}>
              Upload a clear headshot. <strong>Nudity is strictly prohibited.</strong>
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 14,
                  background: "#ffffff",
                  overflow: "hidden",
                  position: "relative",
                  border: `1px solid ${goldSoft}`,
                }}
              >
                <Image
                  src={avatarUrl || "/logo.png"}
                  alt="Current avatar"
                  fill
                  sizes="140px"
                  style={{ objectFit: avatarUrl ? "cover" : "contain", transform: avatarUrl ? undefined : "scale(1.06)" }}
                />
              </div>

              <div>
                <label className="gold-button-outline" style={{ padding: "8px 12px", borderRadius: 10, cursor: "pointer", display: "inline-block" }}>
                  {busy === "avatar" ? "Uploading…" : "Choose image"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) await handleAvatarUpload(file);
                      e.currentTarget.value = "";
                    }}
                    disabled={busy !== null}
                  />
                </label>
              </div>
            </div>
          </section>

          {/* Channel Image */}
          <section style={{ ...cardStyle, padding: 16 }}>
            <h2 style={{ fontWeight: 800, marginBottom: 8 }}>Channel image</h2>
            <p style={{ opacity: 0.9, fontSize: 14, marginBottom: 10 }}>
              This represents your creator channel (banner/cover). Recommended <strong>1280×720</strong> or larger.
            </p>

            <div style={{ display: "grid", gap: 12 }}>
              <div
                style={{
                  width: "100%",
                  height: 140,
                  borderRadius: 14,
                  background: "#ffffff",
                  overflow: "hidden",
                  position: "relative",
                  border: `1px solid ${goldSoft}`,
                }}
              >
                <Image
                  src={channelImageUrl || "/logo.png"}
                  alt="Channel image"
                  fill
                  sizes="720px"
                  style={{ objectFit: channelImageUrl ? "cover" : "contain", transform: channelImageUrl ? undefined : "scale(1.02)" }}
                />
              </div>

              <div>
                <label className="gold-button-outline" style={{ padding: "8px 12px", borderRadius: 10, cursor: "pointer", display: "inline-block" }}>
                  {busy === "channel" ? "Uploading…" : "Choose image"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) await handleChannelUpload(file);
                      e.currentTarget.value = "";
                    }}
                    disabled={busy !== null}
                  />
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* Footer actions */}
        <div style={{ marginTop: 18, display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Link href="/home" className="gold-button-outline" style={{ padding: "8px 12px", borderRadius: 10 }}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
