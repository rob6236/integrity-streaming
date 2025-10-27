// C:\Users\rcwoo\integrity-streaming\app\profile\page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

export default function ProfilePage() {
  const [user, setUser] = useState<{
    name: string;
    username: string;
    bio: string;
    followers: number;
    following: number;
    banner: string;
    profilePic: string | null;
  }>({
    name: "Robbie Woods",
    username: "@robbiewoods",
    bio: "Creator | Developer | Founder of Integrity Streaming — creator-first platform.",
    followers: 1320,
    following: 245,
    banner: "/banner-placeholder.jpg",
    profilePic: null,
  });

  useEffect(() => {
    const u = auth.currentUser;
    if (u) {
      setUser((prev) => ({
        ...prev,
        name: u.displayName || prev.name,
        profilePic: u.photoURL || prev.profilePic,
      }));
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#7B0F24] text-white border-2 border-[#FFD700] flex flex-col">
      {/* ===== Banner + Header ===== */}
      <section className="w-full border-b-2 border-[#FFD700] relative pb-72 md:pb-80">
        <div className="mx-auto max-w-6xl relative">
          {/* Banner */}
          <div className="relative w-full h-96 bg-[#5b0b1c] rounded-t-2xl overflow-hidden">
            <Image src={user.banner} alt="Profile banner" fill className="object-cover" />
          </div>

          {/* Overlay */}
          <div className="absolute left-6 sm:left-10 right-6 sm:right-10 bottom-56 md:bottom-72 z-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar (slight downward nudge) */}
                <div
                  className="shrink-0 rounded-full border-4 border-[#FFD700] overflow-hidden bg-white flex items-center justify-center"
                  style={{ width: "96px", height: "96px", position: "relative", top: "-14px" }}
                >
                  {user.profilePic ? (
                    <Image src={user.profilePic} alt="Profile picture" fill className="object-cover" />
                  ) : (
                    <span className="text-xl font-extrabold tracking-wide" style={{ color: "#7B0F24" }}>
                      RW
                    </span>
                  )}
                </div>

                {/* Name + Handle */}
                <div className="min-w-0 space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#FFD700] leading-tight truncate">
                    {user.name}
                  </h1>
                  {/* Handle lifted above the divider */}
                  <p className="text-sm text-gray-200 leading-none" style={{ position: "relative", top: "-18px" }}>
                    {user.username}
                  </p>
                </div>
              </div>

              {/* Edit Profile button — force white text and glow */}
              <Link
                href="/profile/edit"
                className="inline-block no-underline rounded-xl border-2 border-[#FFD700] px-5 py-2.5 bg-[#7B0F24]/20 hover:bg-[#7B0F24]/40 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/70 text-white visited:text-white hover:text-white focus:text-white active:text-white"
                style={{
                  color: "#fff",
                  textShadow: "0 1px 2px rgba(0,0,0,.85), 0 0 8px rgba(255,215,0,.45)",
                }}
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bio + Stats ===== */}
      <section className="w-full mt-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-lg italic mb-3">{user.bio}</p>

          <div className="flex justify-center items-center text-[#FFD700] font-semibold mt-2" style={{ gap: "16px" }}>
            <span>{user.followers} Followers</span>
            <span aria-hidden="true" className="text-[#FFD700]/80">•</span>
            <span>{user.following} Following</span>
          </div>
        </div>
      </section>

      {/* ===== Tabs ===== */}
      <section className="w-full mt-10 border-b-2 border-[#FFD700]">
        <div className="mx-auto max-w-6xl px-6 flex justify-center gap-3 pb-4">
          {/* Active tab: Videos (white bg, black text, no gold border) */}
          <button className="bg-white text-black font-bold rounded-md px-4 py-1 shadow-sm">
            Videos
          </button>

          {/* Inactive tabs */}
          <button className="text-white hover:text-[#FFD700] border border-transparent px-4 py-1 rounded-md">
            Playlists
          </button>
          <button className="text-white hover:text-[#FFD700] border border-transparent px-4 py-1 rounded-md">
            About
          </button>
        </div>
      </section>

      {/* ===== VIDEO GRID ===== */}
      <section className="w-full py-6 sm:py-8">
        <div className="mx-auto px-6" style={{ maxWidth: "1152px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <article
                key={n}
                style={{
                  backgroundColor: "#5b0b1c",
                  border: "2px solid #FFD700",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", background: "#7B0F24" }} />
                <div style={{ padding: "12px" }}>
                  <h3 style={{ fontWeight: 700, fontSize: "1.125rem", color: "#FFD700" }}>
                    Sample Video {n}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#d1d5db" }}>1.2k views • 2 days ago</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="w-full border-t-2 border-[#FFD700]">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-3">About</h2>
          <p className="text-gray-200 leading-relaxed">
            Integrity Streaming is a creator-first video platform designed to empower independent creators with freedom,
            fairness, and visibility. Built for community.
          </p>
        </div>
      </section>
    </main>
  );
}
