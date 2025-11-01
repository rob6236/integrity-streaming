// app/creator-studio/settings/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SettingsSidebar from "./_components/SettingsSidebar";
import FormSection from "./_components/FormSection";
import SaveBar from "./_components/SaveBar";
import { auth } from "@/lib/firebase";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

const burgundy = "#7B0F24";
const gold = "#FFD700";

type SectionKey =
  | "account"
  | "profile"
  | "billing"
  | "notifications"
  | "privacy"
  | "theme"
  | "ai";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  // ---------- Form state ----------
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [photoURL, setPhotoURL] = useState("");
  const [bannerURL, setBannerURL] = useState("");

  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyInApp, setNotifyInApp] = useState(true);

  const [isPrivate, setIsPrivate] = useState(false);
  const [twoFA, setTwoFA] = useState(false); // placeholder toggle

  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [aiThumb, setAiThumb] = useState(true);
  const [aiCaptions, setAiCaptions] = useState(true);

  const [saving, setSaving] = useState(false);
  const original = useRef<string>("");

  // Initialize from current user once
  useEffect(() => {
    if (!user) return;
    setDisplayName(user.displayName || "");
    setEmail(user.email || "");
    setPhotoURL(user.photoURL || "");
  }, [user]);

  // Track "dirty" by hashing current fields
  const hash = useMemo(() => {
    return JSON.stringify({
      displayName,
      email,
      newPassword: newPassword ? "•••" : "",
      photoURL,
      bannerURL,
      notifyEmail,
      notifyInApp,
      isPrivate,
      twoFA,
      theme,
      aiThumb,
      aiCaptions,
    });
  }, [
    displayName,
    email,
    newPassword,
    photoURL,
    bannerURL,
    notifyEmail,
    notifyInApp,
    isPrivate,
    twoFA,
    theme,
    aiThumb,
    aiCaptions,
  ]);

  useEffect(() => {
    if (!original.current) original.current = hash;
  }, [hash]);

  const dirty = original.current && original.current !== hash;

  const resetForm = () => {
    if (!user) return;
    setDisplayName(user.displayName || "");
    setEmail(user.email || "");
    setNewPassword("");
    setPhotoURL(user.photoURL || "");
    setBannerURL("");
    setNotifyEmail(true);
    setNotifyInApp(true);
    setIsPrivate(false);
    setTwoFA(false);
    setTheme("light");
    setAiThumb(true);
    setAiCaptions(true);
    original.current = JSON.stringify({
      displayName: user.displayName || "",
      email: user.email || "",
      newPassword: "",
      photoURL: user.photoURL || "",
      bannerURL: "",
      notifyEmail: true,
      notifyInApp: true,
      isPrivate: false,
      twoFA: false,
      theme: "light",
      aiThumb: true,
      aiCaptions: true,
    });
  };

  // ---------- Save handler ----------
  const onSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      // Account
      if (displayName !== (user.displayName || "")) {
        await updateProfile(user, { displayName });
      }
      if (photoURL !== (user.photoURL || "")) {
        await updateProfile(user, { photoURL });
      }
      if (email !== (user.email || "")) {
        // NOTE: May require recent re-auth in production
        await updateEmail(user, email);
      }
      if (newPassword.trim()) {
        // NOTE: May require recent re-auth in production
        await updatePassword(user, newPassword.trim());
        setNewPassword("");
      }

      // Non-auth settings (notifications/privacy/theme/AI) would normally be saved
      // to Firestore. Here we just simulate success.
      // TODO: Save to Firestore collection like `users/{uid}/settings`.

      // Update dirty baseline
      original.current = hash;
    } catch (err) {
      console.error("Save error:", err);
      alert(
        "Some changes could not be saved (email/password may require recent sign-in)."
      );
    } finally {
      setSaving(false);
    }
  };

  const sections: { id: SectionKey; label: string }[] = [
    { id: "account", label: "Account" },
    { id: "profile", label: "Profile" },
    { id: "billing", label: "Billing & Subscription" },
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy & Security" },
    { id: "theme", label: "Theme" },
    { id: "ai", label: "AI Tools" },
  ];

  return (
    <div
      className="min-h-[100dvh] w-full"
      style={{
        background: burgundy,
        color: "#FFF",
        border: `1px solid ${gold}`,
      }}
    >
      {/* thin gold border around viewport */}
      <div
        className="mx-auto max-w-6xl px-4 md:px-6 pt-8 pb-28"
        style={{ borderTop: `1px solid ${gold}` }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          Creator Studio • Settings
        </h1>

        <div className="flex gap-6">
          <SettingsSidebar items={sections} />

          <main className="flex-1">
            {/* Account */}
            <FormSection
              id="account"
              title="Account"
              description="Update your basic account information."
            >
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-white/80">Display name</span>
                  <input
                    className="rounded-xl px-3 py-2 bg-black/30 outline-none"
                    style={{ border: `1px solid ${gold}` }}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your display name"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-white/80">Email</span>
                  <input
                    className="rounded-xl px-3 py-2 bg-black/30 outline-none"
                    style={{ border: `1px solid ${gold}` }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-sm text-white/80">
                    New password (optional)
                  </span>
                  <input
                    type="password"
                    className="rounded-xl px-3 py-2 bg-black/30 outline-none"
                    style={{ border: `1px solid ${gold}` }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </label>
              </div>
            </FormSection>

            {/* Profile */}
            <FormSection
              id="profile"
              title="Profile"
              description="Update your profile photo and banner."
            >
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-white/80">Profile Photo URL</span>
                  <input
                    className="rounded-xl px-3 py-2 bg-black/30 outline-none"
                    style={{ border: `1px solid ${gold}` }}
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="https://…/photo.jpg"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm text-white/80">Banner Image URL</span>
                  <input
                    className="rounded-xl px-3 py-2 bg-black/30 outline-none"
                    style={{ border: `1px solid ${gold}` }}
                    value={bannerURL}
                    onChange={(e) => setBannerURL(e.target.value)}
                    placeholder="https://…/banner.jpg"
                  />
                </label>
              </div>
              <p className="text-xs text-white/60">
                (Uploads will be wired later via Firebase Storage / Cloudflare R2.)
              </p>
            </FormSection>

            {/* Billing */}
            <FormSection
              id="billing"
              title="Billing & Subscription"
              description="Your plan and payment details."
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-xl p-4 bg-black/30 border" style={{ borderColor: gold }}>
                  <div className="text-sm text-white/70">Current plan</div>
                  <div className="font-semibold mt-1">Creator • $15/mo</div>
                </div>
                <div className="rounded-xl p-4 bg-black/30 border" style={{ borderColor: gold }}>
                  <div className="text-sm text-white/70">Renewal date</div>
                  <div className="font-semibold mt-1">Auto-renews monthly</div>
                </div>
                <div className="rounded-xl p-4 bg-black/30 border" style={{ borderColor: gold }}>
                  <div className="text-sm text-white/70">Payment method</div>
                  <div className="font-semibold mt-1">•••• 4242 (Stripe)</div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  className="px-4 py-2 rounded-xl font-semibold"
                  style={{ background: gold, color: burgundy }}
                  type="button"
                >
                  Manage plan
                </button>
                <button
                  className="px-4 py-2 rounded-xl border"
                  style={{ borderColor: gold }}
                  type="button"
                >
                  Update payment method
                </button>
              </div>
            </FormSection>

            {/* Notifications */}
            <FormSection
              id="notifications"
              title="Notifications"
              description="Choose how you want to be notified."
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                />
                <span>Email notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={notifyInApp}
                  onChange={(e) => setNotifyInApp(e.target.checked)}
                />
                <span>In-app notifications</span>
              </label>
            </FormSection>

            {/* Privacy & Security */}
            <FormSection
              id="privacy"
              title="Privacy & Security"
              description="Control who can see your content and add extra security."
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <span>Make my profile private</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={twoFA}
                  onChange={(e) => setTwoFA(e.target.checked)}
                />
                <span>Enable 2-factor authentication (coming soon)</span>
              </label>
            </FormSection>

            {/* Theme */}
            <FormSection
              id="theme"
              title="Theme"
              description="Switch between light and dark."
            >
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === "light"}
                    onChange={() => setTheme("light")}
                  />
                  <span>Light</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={theme === "dark"}
                    onChange={() => setTheme("dark")}
                  />
                  <span>Dark</span>
                </label>
              </div>
              <p className="text-xs text-white/60">
                (We’ll wire this to your global theme store in a follow-up.)
              </p>
            </FormSection>

            {/* AI Tools */}
            <FormSection
              id="ai"
              title="AI Tools"
              description="Turn on/off creator AI helpers."
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={aiThumb}
                  onChange={(e) => setAiThumb(e.target.checked)}
                />
                <span>AI Thumbnail Generator</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={aiCaptions}
                  onChange={(e) => setAiCaptions(e.target.checked)}
                />
                <span>AI Caption Assistant</span>
              </label>
            </FormSection>
          </main>
        </div>
      </div>

      <SaveBar dirty={!!dirty} saving={saving} onSave={onSave} onReset={resetForm} />
    </div>
  );
}
