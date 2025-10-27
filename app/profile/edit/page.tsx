// C:\Users\rcwoo\integrity-streaming\app\profile\edit\page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth, storage } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProfilePage() {
  const router = useRouter();
  const u = auth.currentUser;

  const [displayName, setDisplayName] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!u) return;
    setDisplayName(u.displayName || "");
    setPhotoURL(u.photoURL || null);
  }, [u]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f || null);
    if (f) {
      const url = URL.createObjectURL(f);
      setPhotoURL(url);
    }
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setError("You must be logged in.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      let finalURL = auth.currentUser.photoURL || null;

      if (file) {
        const ext = file.name.split(".").pop() || "jpg";
        const avatarRef = ref(storage, `profilePics/${auth.currentUser.uid}.${ext}`);
        await uploadBytes(avatarRef, file);
        finalURL = await getDownloadURL(avatarRef);
      }

      await updateProfile(auth.currentUser, {
        displayName: displayName || auth.currentUser.displayName || "",
        photoURL: finalURL || auth.currentUser.photoURL || "",
      });

      router.push("/profile");
    } catch (err: any) {
      setError(err?.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#7B0F24] text-white border-2 border-[#FFD700]">
      <form
        onSubmit={onSave}
        className="w-full max-w-lg rounded-2xl border-2 border-[#FFD700] bg-[#7B0F24] p-6"
        style={{ paddingLeft: "1in", paddingRight: "1in" }}  // <-- ONLY CHANGE
      >
        <h1 className="text-2xl font-extrabold text-[#FFD700] mb-4">Edit Profile</h1>

        {/* Preview */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-[#FFD700] bg-white">
            <Image
              src={photoURL || "/profile-placeholder.jpg"}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Profile Photo</label>
            <input type="file" accept="image/*" onChange={onPick} className="text-sm" />
          </div>
        </div>

        <label className="block text-sm mb-1">Display name</label>
        <input
          className="w-full rounded-md border border-[#FFD700] p-2 text-black mb-4"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name"
        />

        {error && <p className="text-red-300 text-sm mb-3">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="rounded-xl bg-white/90 px-4 py-2 text-black font-semibold hover:bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl border-2 border-[#FFD700] bg-white px-5 py-2 text-black font-extrabold hover:bg-white/95 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </main>
  );
}
