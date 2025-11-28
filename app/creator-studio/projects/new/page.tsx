"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const IVORY = "#FFF9F0";

type ProjectSetupForm = {
  projectName: string;
  contentType: string;
  aspectRatio: string;
  targetPlatform: string;
  category: string;
  defaultDescription: string;
  defaultResolution: string;
  defaultFps: string;
  defaultQuality: string;
  defaultVisibility: string;
  defaultTags: string;
};

export default function NewProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState<ProjectSetupForm>({
    projectName: "",
    contentType: "long-form",
    aspectRatio: "16:9",
    targetPlatform: "Integrity Streaming",
    category: "",
    defaultDescription: "",
    defaultResolution: "1080p",
    defaultFps: "30",
    defaultQuality: "high",
    defaultVisibility: "private",
    defaultTags: "",
  });

  const updateField =
    (field: keyof ProjectSetupForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 🔧 Later: save to Firestore / backend.
    console.log("New project setup (mock):", form);

    alert("Project defaults saved (mock). Later you’ll connect this to Firestore.");

    // Same behavior as your old NewProjectPage:
    router.push("/creator-studio/editor");
  };

  const handleCancel = () => {
    router.push("/creator-studio");
  };

  return (
    <div className="ps-root">
      <style jsx>{`
        .ps-root {
          min-height: 100vh;
          background: ${BURGUNDY};
          color: ${IVORY};
          padding: 24px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .ps-shell {
          width: 100%;
          max-width: 1120px;
        }

        .ps-title {
          font-size: 32px;
          font-weight: 800;
          color: ${GOLD};
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
          margin-bottom: 4px;
          text-align: left;
        }

        .ps-subtitle {
          font-size: 16px;
          opacity: 0.9;
          margin-bottom: 24px;
          text-align: left;
        }

        .ps-card {
          background: radial-gradient(circle at top, #181818, #050505);
          border-radius: 18px;
          border: 2px solid ${GOLD};
          padding: 20px 20px 18px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
        }

        .ps-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .ps-section-title {
          font-size: 18px;
          font-weight: 700;
          color: ${GOLD};
          margin-bottom: 14px;
        }

        .ps-field-group {
          margin-bottom: 14px;
        }

        .ps-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .ps-label span {
          font-size: 11px;
          opacity: 0.7;
          margin-left: 4px;
          font-weight: 400;
        }

        .ps-input,
        .ps-select,
        .ps-textarea {
          width: 100%;
          box-sizing: border-box;
          background: #101010;
          border-radius: 999px;
          border: 2px solid #333;
          padding: 8px 12px;
          font-size: 14px;
          color: ${IVORY};
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .ps-textarea {
          border-radius: 18px;
          resize: vertical;
          min-height: 80px;
        }

        .ps-input:focus,
        .ps-select:focus,
        .ps-textarea:focus {
          border-color: ${GOLD};
          box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.35);
          background: #151515;
        }

        .ps-row {
          display: flex;
          gap: 10px;
        }

        .ps-row > * {
          flex: 1;
        }

        .ps-actions-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: space-between;
        }

        .ps-actions-main {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ps-primary-btn,
        .ps-secondary-btn {
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          padding: 10px 18px;
          border: 2px solid ${GOLD};
          cursor: pointer;
          transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease,
            color 0.12s ease;
          text-align: center;
        }

        .ps-primary-btn {
          background: ${GOLD};
          color: #2c020b;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
        }

        .ps-primary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.75);
        }

        .ps-secondary-btn {
          background: transparent;
          color: ${IVORY};
          border-color: #f0c85a;
        }

        .ps-secondary-btn:hover {
          background: rgba(0, 0, 0, 0.35);
        }

        .ps-helper-text {
          font-size: 12px;
          opacity: 0.8;
        }

        .ps-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .ps-badge {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(0, 0, 0, 0.4);
        }

        .ps-footer-note {
          font-size: 12px;
          opacity: 0.75;
          text-align: center;
          margin-top: 4px;
        }

        /* 📱 Mobile / tablet responsiveness */
        @media (max-width: 900px) {
          .ps-root {
            padding: 16px;
            align-items: flex-start;
          }

          .ps-shell {
            max-width: 100%;
          }

          .ps-title {
            font-size: 26px;
            text-align: center;
          }

          .ps-subtitle {
            text-align: center;
          }

          .ps-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .ps-actions-card {
            order: -1; /* show actions above details on mobile */
          }
        }

        @media (max-width: 600px) {
          .ps-card {
            padding: 16px 14px 14px;
          }

          .ps-row {
            flex-direction: column;
          }

          .ps-title {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="ps-shell">
        <h1 className="ps-title">New Project Setup</h1>
        <p className="ps-subtitle">
          Set your project defaults before editing or rendering. You can change these later in the
          editor.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="ps-grid">
            {/* LEFT: Project basics */}
            <div className="ps-card">
              <h2 className="ps-section-title">Project Basics</h2>

              <div className="ps-field-group">
                <label className="ps-label">
                  Project name
                  <span>(what you see inside Creator Studio)</span>
                </label>
                <input
                  className="ps-input"
                  type="text"
                  value={form.projectName}
                  onChange={updateField("projectName")}
                  placeholder="My Integrity Streaming Project"
                  required
                />
              </div>

              <div className="ps-row">
                <div className="ps-field-group">
                  <label className="ps-label">Content type</label>
                  <select
                    className="ps-select"
                    value={form.contentType}
                    onChange={updateField("contentType")}
                  >
                    <option value="long-form">Long-form video</option>
                    <option value="short">Shorts / Reels</option>
                    <option value="clip-pack">Clip compilation</option>
                    <option value="podcast-video">Podcast (video)</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="ps-field-group">
                  <label className="ps-label">Primary aspect ratio</label>
                  <select
                    className="ps-select"
                    value={form.aspectRatio}
                    onChange={updateField("aspectRatio")}
                  >
                    <option value="16:9">16:9 (standard landscape)</option>
                    <option value="9:16">9:16 (vertical)</option>
                    <option value="1:1">1:1 (square)</option>
                  </select>
                </div>
              </div>

              <div className="ps-field-group">
                <label className="ps-label">
                  Main platform
                  <span>(where this project is primarily published)</span>
                </label>
                <select
                  className="ps-select"
                  value={form.targetPlatform}
                  onChange={updateField("targetPlatform")}
                >
                  <option value="Integrity Streaming">Integrity Streaming</option>
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">Facebook</option>
                  <option value="multi-platform">Multi-platform</option>
                </select>
              </div>

              <div className="ps-field-group">
                <label className="ps-label">Category</label>
                <input
                  className="ps-input"
                  type="text"
                  value={form.category}
                  onChange={updateField("category")}
                  placeholder="Education, Commentary, Gaming, etc."
                />
              </div>

              <div className="ps-field-group">
                <label className="ps-label">
                  Default description template
                  <span>(used as the starting description for this project)</span>
                </label>
                <textarea
                  className="ps-textarea"
                  value={form.defaultDescription}
                  onChange={updateField("defaultDescription")}
                  placeholder="Write a default description you want to reuse for this project..."
                />
              </div>
            </div>

            {/* RIGHT: Defaults & actions */}
            <div className="ps-card ps-actions-card">
              <div>
                <h2 className="ps-section-title">Render & publish defaults</h2>

                <div className="ps-row">
                  <div className="ps-field-group">
                    <label className="ps-label">Default resolution</label>
                    <select
                      className="ps-select"
                      value={form.defaultResolution}
                      onChange={updateField("defaultResolution")}
                    >
                      <option value="720p">720p</option>
                      <option value="1080p">1080p</option>
                      <option value="1440p">1440p</option>
                      <option value="2160p">4K</option>
                    </select>
                  </div>

                  <div className="ps-field-group">
                    <label className="ps-label">Default frame rate</label>
                    <select
                      className="ps-select"
                      value={form.defaultFps}
                      onChange={updateField("defaultFps")}
                    >
                      <option value="24">24 fps</option>
                      <option value="30">30 fps</option>
                      <option value="48">48 fps</option>
                      <option value="60">60 fps</option>
                    </select>
                  </div>
                </div>

                <div className="ps-row">
                  <div className="ps-field-group">
                    <label className="ps-label">Quality preference</label>
                    <select
                      className="ps-select"
                      value={form.defaultQuality}
                      onChange={updateField("defaultQuality")}
                    >
                      <option value="standard">Standard</option>
                      <option value="high">High</option>
                      <option value="max">Max (heavier files)</option>
                    </select>
                  </div>

                  <div className="ps-field-group">
                    <label className="ps-label">Default visibility</label>
                    <select
                      className="ps-select"
                      value={form.defaultVisibility}
                      onChange={updateField("defaultVisibility")}
                    >
                      <option value="private">Private</option>
                      <option value="unlisted">Unlisted</option>
                      <option value="public">Public</option>
                    </select>
                  </div>
                </div>

                <div className="ps-field-group">
                  <label className="ps-label">
                    Default tags
                    <span>(comma separated)</span>
                  </label>
                  <input
                    className="ps-input"
                    type="text"
                    value={form.defaultTags}
                    onChange={updateField("defaultTags")}
                    placeholder="integrity streaming, commentary, episode 1..."
                  />
                  <p className="ps-helper-text">
                    Later, AI tag suggestions will appear here based on your title & description.
                  </p>
                  <div className="ps-badge-row">
                    <span className="ps-badge">AI tags (coming soon)</span>
                    <span className="ps-badge">Safe to build now</span>
                  </div>
                </div>
              </div>

              <div className="ps-actions-main">
                <button type="submit" className="ps-primary-btn">
                  Save project defaults & continue to editor
                </button>
                <button
                  type="button"
                  className="ps-secondary-btn"
                  onClick={handleCancel}
                >
                  Cancel and go back
                </button>
                <p className="ps-footer-note">
                  This is a UI-only flow for now. Later you’ll connect it to Firestore and route
                  directly into your Editor or Render page.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
