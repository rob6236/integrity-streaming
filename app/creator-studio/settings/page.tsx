// app/creator-studio/settings/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updateProfile, updateEmail } from "firebase/auth";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";

type SettingsSectionId =
  | "account"
  | "channel"
  | "notifications"
  | "playback"
  | "privacy"
  | "connectedApps"
  | "billing"
  | "advanced";

type SettingsSection = {
  id: SettingsSectionId;
  label: string;
  description: string;
};

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: "account",
    label: "Account",
    description:
      "Choose how your account appears on Integrity Streaming and manage your basic info.",
  },
  {
    id: "channel",
    label: "Channel & Creator Profile",
    description:
      "Control how your creator channel appears. Detailed layout tools stay in the Channel & Customize pages.",
  },
  {
    id: "notifications",
    label: "Notifications",
    description:
      "Decide when Integrity Streaming is allowed to email or notify you.",
  },
  {
    id: "playback",
    label: "Playback & Performance",
    description:
      "Set default playback quality, captions, and performance options.",
  },
  {
    id: "privacy",
    label: "Privacy & Safety",
    description:
      "Control who can see your activity and manage basic safety controls.",
  },
  {
    id: "connectedApps",
    label: "Connected Apps",
    description:
      "Connect external accounts and tools that integrate with Integrity Streaming.",
  },
  {
    id: "billing",
    label: "Billing & Payments",
    description:
      "See a quick summary, then go to the Billing page for full billing controls.",
  },
  {
    id: "advanced",
    label: "Advanced Settings",
    description:
      "Export your data, close your account, and manage advanced options.",
  },
];

type AdvancedActions = {
  onDeleteAccount: () => Promise<void>;
  onDeleteChannel: () => Promise<void>;
  isDeletingAccount: boolean;
  isDeletingChannel: boolean;
};

type SaveStatus = "idle" | "saving" | "success" | "error" | "warning";

/* ---------- MAIN COMPONENT ---------- */

export default function SettingsPage() {
  const [activeSectionId, setActiveSectionId] =
    useState<SettingsSectionId>("account");

  // Deletion states
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isDeletingChannel, setIsDeletingChannel] = useState(false);

  // Account form state (what we load & save)
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [region, setRegion] = useState("US");

  // Save-status UI
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const activeSection = SETTINGS_SECTIONS.find(
    (s) => s.id === activeSectionId
  )!;

  /* ---------- Load profile data on mount ---------- */
  useEffect(() => {
    async function loadProfile() {
      const current = auth.currentUser;
      if (!current) {
        setIsLoadingProfile(false);
        return;
      }

      try {
        const userRef = doc(db, "users", current.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data() as any;
          setAccountName(
            data.displayName || current.displayName || ""
          );
          setAccountEmail(data.email || current.email || "");
          setLanguage(
            data.language || "en-US"
          );
          setRegion(
            data.region || "US"
          );
        } else {
          // No Firestore doc yet – seed from Auth
          setAccountName(current.displayName || "");
          setAccountEmail(current.email || "");
          setLanguage("en-US");
          setRegion("US");
        }
      } catch (err) {
        console.error("Error loading user profile:", err);
        setSaveStatus("error");
        setSaveMessage(
          "We had trouble loading your profile details. You can still try saving changes."
        );
      } finally {
        setIsLoadingProfile(false);
      }
    }

    loadProfile();
  }, []);

  /* ---------- Delete ACCOUNT (everything) ---------- */
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure? This will permanently DELETE your Integrity Streaming account, channels, videos, comments, and all data. This cannot be undone."
      )
    ) {
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to delete your account.");
      return;
    }

    try {
      setIsDeletingAccount(true);
      const idToken = await user.getIdToken();

      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete account.");
      }

      alert("Your Integrity Streaming account has been deleted.");
      window.location.href = "/goodbye";
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong deleting your account.");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  /* ---------- Delete CREATOR CHANNEL ONLY ---------- */
  const handleDeleteChannel = async () => {
    if (
      !window.confirm(
        "Delete your creator channel? This removes your channel, channel videos, thumbnails, and posts. Your viewer account will stay. This cannot be undone."
      )
    ) {
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to delete your channel.");
      return;
    }

    try {
      setIsDeletingChannel(true);
      const idToken = await user.getIdToken();

      const res = await fetch("/api/delete-channel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete channel.");
      }

      alert("Your creator channel has been deleted.");
      window.location.href = "/creator-studio/dashboard";
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong deleting your channel.");
    } finally {
      setIsDeletingChannel(false);
    }
  };

  const advancedActions: AdvancedActions = {
    onDeleteAccount: handleDeleteAccount,
    onDeleteChannel: handleDeleteChannel,
    isDeletingAccount,
    isDeletingChannel,
  };

  /* ---------- Save ALL changes (Account + profile doc) ---------- */
  const handleSaveChanges = async () => {
    setSaveStatus("saving");
    setSaveMessage(null);

    const current = auth.currentUser;
    if (!current) {
      setSaveStatus("error");
      setSaveMessage(
        "You must be logged in to save your settings."
      );
      return;
    }

    try {
      // 1) Update display name in Auth, if changed
      if (
        accountName &&
        current.displayName !== accountName
      ) {
        await updateProfile(current, {
          displayName: accountName,
        });
      }

      // 2) Try to update email in Auth if user changed it.
      // If this fails, we still save everything else.
      let emailToSave = accountEmail || current.email || "";

      if (
        accountEmail &&
        current.email &&
        current.email !== accountEmail
      ) {
        try {
          await updateEmail(current, accountEmail);
          emailToSave = accountEmail;
        } catch (err: any) {
          console.error("Email update failed:", err);
          // Keep using the old email in Firestore
          emailToSave = current.email;
          setSaveStatus("warning");
          setSaveMessage(
            "Your profile and preferences were saved, but we couldn't change your login email. Try logging out and back in, then change it again."
          );
        }
      }

      // 3) Upsert user document in Firestore: users/{uid}
      const userRef = doc(db, "users", current.uid);
      await setDoc(
        userRef,
        {
          displayName:
            accountName || current.displayName || "",
          email: emailToSave,
          language,
          region,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // If we didn't already set a warning above, mark as success
      setSaveStatus((prev) =>
        prev === "warning" ? "warning" : "success"
      );
      setSaveMessage((prev) =>
        prev && saveStatus === "warning"
          ? prev
          : "Account settings saved successfully."
      );
    } catch (err: any) {
      console.error("Error saving account settings:", err);
      setSaveStatus("error");
      setSaveMessage(
        err?.message ||
          "Something went wrong saving your settings. Please try again."
      );
    }
  };

  const accountState = {
    accountName,
    setAccountName,
    accountEmail,
    setAccountEmail,
    language,
    setLanguage,
    region,
    setRegion,
  };

  return (
    <div
      style={{
        padding: "24px 32px 40px 32px",
        color: "#fff",
      }}
    >
      {/* Page heading */}
      <h1
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: GOLD,
          textShadow: "2px 2px 0 #000",
          marginBottom: 8,
        }}
      >
        Settings
      </h1>

      <p
        style={{
          marginBottom: 24,
          fontSize: 16,
          maxWidth: 680,
        }}
      >
        Adjust how your account and channel work. These settings
        control your overall Integrity Streaming experience as a
        viewer and creator.
      </p>

      {/* Inner layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        {/* Left column: sections list */}
        <nav
          aria-label="Settings sections"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,.55), rgba(0,0,0,.35))",
            borderRadius: 18,
            border: `2px solid rgba(255,215,0,.6)`,
            padding: 12,
            boxShadow: "0 0 18px rgba(0,0,0,.45)",
          }}
        >
          {SETTINGS_SECTIONS.map((section) => {
            const isActive = section.id === activeSectionId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSectionId(section.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 12px",
                  marginBottom: 6,
                  borderRadius: 12,
                  border: isActive
                    ? `2px solid ${GOLD}`
                    : "2px solid transparent",
                  backgroundColor: isActive
                    ? "rgba(255,215,0,.18)"
                    : "transparent",
                  color: "#fff",
                  fontWeight: isActive ? 800 : 600,
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                {section.label}
              </button>
            );
          })}
        </nav>

        {/* Right column: active section card */}
        <section
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,.6), rgba(0,0,0,.4))",
            borderRadius: 20,
            border: `2px solid rgba(255,215,0,.55)`,
            padding: 20,
            boxShadow: "0 0 24px rgba(0,0,0,.6)",
          }}
        >
          <header style={{ marginBottom: 16 }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 4,
                color: GOLD,
              }}
            >
              {activeSection.label}
            </h2>
            <p
              style={{
                fontSize: 14,
                opacity: 0.85,
                maxWidth: 640,
              }}
            >
              {activeSection.description}
            </p>
          </header>

          {isLoadingProfile && activeSectionId === "account" ? (
            <p style={{ fontSize: 14, opacity: 0.85 }}>
              Loading your account details…
            </p>
          ) : (
            renderSectionContent(
              activeSectionId,
              advancedActions,
              accountState
            )
          )}

          {/* Save bar */}
          <div
            style={{
              marginTop: 24,
              borderTop: "1px solid rgba(255,255,255,.18)",
              paddingTop: 12,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              <div>
                Changes (other than deletion) will be wired to your
                account in a later step. (UI only for now.)
              </div>
              {saveMessage && (
                <div
                  style={{
                    marginTop: 4,
                    color:
                      saveStatus === "error"
                        ? "#ffb3b3"
                        : saveStatus === "warning"
                        ? "#ffd6a3"
                        : "#a7f3d0",
                    fontWeight: 600,
                  }}
                >
                  {saveMessage}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={saveStatus === "saving"}
              style={{
                padding: "8px 22px",
                borderRadius: 999,
                border: `2px solid ${GOLD}`,
                backgroundColor:
                  saveStatus === "saving" ? "#ffe58a" : GOLD,
                color: "#000",
                fontWeight: 800,
                cursor:
                  saveStatus === "saving"
                    ? "default"
                    : "pointer",
                minWidth: 140,
              }}
            >
              {saveStatus === "saving"
                ? "Saving..."
                : "Save changes"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- Section content renderer ---------- */

type AccountStateProps = {
  accountName: string;
  setAccountName: (v: string) => void;
  accountEmail: string;
  setAccountEmail: (v: string) => void;
  language: string;
  setLanguage: (v: string) => void;
  region: string;
  setRegion: (v: string) => void;
};

function renderSectionContent(
  sectionId: SettingsSectionId,
  actions: AdvancedActions,
  accountState: AccountStateProps
) {
  const {
    accountName,
    setAccountName,
    accountEmail,
    setAccountEmail,
    language,
    setLanguage,
    region,
    setRegion,
  } = accountState;

  switch (sectionId) {
    case "account":
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <FieldGroup title="Profile name">
            <input
              id="account-name-input"
              type="text"
              placeholder="Display name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              style={inputStyle}
            />
            <p style={helpTextStyle}>
              This is the name viewers see on Integrity Streaming.
            </p>
          </FieldGroup>

          <FieldGroup title="Account email">
            <input
              id="account-email-input"
              type="email"
              placeholder="you@example.com"
              value={accountEmail}
              onChange={(e) => setAccountEmail(e.target.value)}
              style={inputStyle}
            />
            <p style={helpTextStyle}>
              Used for important account communication and security.
            </p>
          </FieldGroup>

          <FieldGroup title="Language & region">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={inputStyle}
              >
                <option value="en-US">English (United States)</option>
                <option value="en-GB">English (United Kingdom)</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                style={inputStyle}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </FieldGroup>
        </div>
      );

    case "channel":
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <FieldGroup title="Channel name">
            <input
              type="text"
              placeholder="Your channel name"
              style={inputStyle}
            />
            <p style={helpTextStyle}>
              This controls the public name of your creator channel.
            </p>
          </FieldGroup>

          <FieldGroup title="Channel visibility">
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Make my channel discoverable in search and
              recommendations
            </label>
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Show my subscriber count publicly
            </label>
            <p style={helpTextStyle}>
              Detailed layout, banner, and sections are edited in the
              Channel and Customize pages, not here.
            </p>
          </FieldGroup>

          <FieldGroup title="Default upload privacy">
            <select style={inputStyle}>
              <option>Public</option>
              <option>Unlisted</option>
              <option>Private</option>
            </select>
            <p style={helpTextStyle}>
              This is only the default. You can still change privacy
              for each video on the Upload or Content Library pages.
            </p>
          </FieldGroup>
        </div>
      );

    case "notifications":
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <FieldGroup title="Email notifications">
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Send me important account and security updates
            </label>
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Send me creator tips and product updates
            </label>
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Send me viewer activity summaries (likes, comments,
              follows)
            </label>
          </FieldGroup>

          <FieldGroup title="On-platform notifications">
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Show notifications for new comments on my content
            </label>
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Show notifications when my videos are approved or
              flagged
            </label>
          </FieldGroup>
        </div>
      );

    case "playback":
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <FieldGroup title="Default playback quality">
            <select style={inputStyle}>
              <option>Auto (recommended)</option>
              <option>1080p</option>
              <option>720p</option>
              <option>480p</option>
              <option>360p</option>
            </select>
          </FieldGroup>

          <FieldGroup title="Captions">
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Always show captions when available
            </label>
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Prefer auto-generated captions when no manual captions
              exist
            </label>
          </FieldGroup>

          <FieldGroup title="Performance">
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Limit data usage on mobile networks
            </label>
          </FieldGroup>
        </div>
      );

    case "privacy":
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <FieldGroup title="Profile & activity">
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Keep my liked videos private
            </label>
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Keep my subscriptions private
            </label>
          </FieldGroup>

          <FieldGroup title="Comments & messages">
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Filter potentially inappropriate comments
            </label>
            <label style={checkboxRowStyle}>
              <input type="checkbox" style={{ marginRight: 8 }} />
              Allow viewers to send me direct messages
            </label>
          </FieldGroup>
        </div>
      );

    case "connectedApps":
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <FieldGroup title="Connected apps">
            <p style={helpTextStyle}>
              In the future you&apos;ll be able to connect editing
              tools, scheduling apps, and other platforms here.
            </p>

            <div
              style={{
                borderRadius: 12,
                border: "1px dashed rgba(255,255,255,.35)",
                padding: 16,
                fontSize: 14,
                opacity: 0.9,
              }}
            >
              No external apps connected yet.
            </div>
          </FieldGroup>
        </div>
      );

    case "billing":
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <FieldGroup title="Subscription overview">
            <p style={helpTextStyle}>
              Billing details, invoices, and payment methods are
              managed on the{" "}
              <strong>Billing</strong> page so we don&apos;t
              duplicate controls in multiple places.
            </p>

            <Link
              href="/creator-studio/billing"
              style={{
                marginTop: 8,
                display: "inline-block",
                padding: "8px 20px",
                borderRadius: 999,
                border: `2px solid ${GOLD}`,
                backgroundColor: GOLD,
                color: "#000",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Go to Billing page
            </Link>
          </FieldGroup>
        </div>
      );

    case "advanced":
      return (
        <div style={{ display: "grid", gap: 20 }}>
          <FieldGroup title="Delete your Integrity Streaming account">
            <p style={helpTextStyle}>
              This will permanently delete your Integrity Streaming
              account, channels, videos, thumbnails, comments, likes,
              and any other data linked to your profile. This action
              happens automatically and cannot be undone.
            </p>
            <button
              type="button"
              onClick={actions.onDeleteAccount}
              disabled={actions.isDeletingAccount}
              style={{
                marginTop: 8,
                padding: "10px 22px",
                borderRadius: 999,
                border: "2px solid #ff4b4b",
                backgroundColor: actions.isDeletingAccount
                  ? "rgba(255,75,75,.25)"
                  : "transparent",
                color: "#ffb3b3",
                fontWeight: 800,
                cursor: actions.isDeletingAccount
                  ? "default"
                  : "pointer",
              }}
            >
              {actions.isDeletingAccount
                ? "Deleting account..."
                : "Delete Integrity Streaming account"}
            </button>
          </FieldGroup>

          <FieldGroup title="Delete your creator channel only">
            <p style={helpTextStyle}>
              This removes your creator channel, channel videos,
              thumbnails, and posts but keeps your viewer account so
              you can still watch and follow other creators.
            </p>
            <button
              type="button"
              onClick={actions.onDeleteChannel}
              disabled={actions.isDeletingChannel}
              style={{
                marginTop: 8,
                padding: "10px 22px",
                borderRadius: 999,
                border: "2px solid #ff9800",
                backgroundColor: actions.isDeletingChannel
                  ? "rgba(255,152,0,.2)"
                  : "transparent",
                color: "#ffd6a3",
                fontWeight: 800,
                cursor: actions.isDeletingChannel
                  ? "default"
                  : "pointer",
              }}
            >
              {actions.isDeletingChannel
                ? "Deleting channel..."
                : "Delete creator channel"}
            </button>
          </FieldGroup>
        </div>
      );

    default:
      return null;
  }
}

/* ---------- Small reusable pieces ---------- */

function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,.4)",
  padding: "8px 10px",
  backgroundColor: "rgba(0,0,0,.35)",
  color: "#fff",
  fontSize: 14,
};

const helpTextStyle: React.CSSProperties = {
  fontSize: 13,
  opacity: 0.85,
  marginTop: 4,
};

const checkboxRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginBottom: 4,
  fontSize: 14,
};
