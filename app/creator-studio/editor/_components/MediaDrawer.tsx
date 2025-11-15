// app/creator-studio/editor/_components/MediaDrawer.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { useTimelineStore } from "../_hooks/useTimelineStore";
import type { MediaItem } from "../_hooks/useTimelineStore";
import { auth, storage } from "@/lib/firebase";
import {
  ref as storageRef,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const GOLD = "#FFD700";
const CARD_BG = "rgba(0,0,0,0.35)";

export default function MediaDrawer() {
  const {
    mediaPool,
    addMedia,
    removeMedia,
    setMediaPool,
    setPreviewUrl,
  } = useTimelineStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 1) Load media from Firebase uploads (published/{uid}/...)
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const loadUploads = async () => {
      try {
        const baseRef = storageRef(storage, `published/${user.uid}`);
        const listing = await listAll(baseRef);

        const items: MediaItem[] = await Promise.all(
          listing.items.map(async (obj) => {
            const url = await getDownloadURL(obj);
            const name = obj.name;
            const lower = name.toLowerCase();

            let kind: MediaItem["kind"] = "other";
            if (/\.(mp4|mov|m4v|webm|mkv)$/i.test(lower)) kind = "video";
            else if (/\.(png|jpe?g|gif|webp)$/i.test(lower)) kind = "image";

            return {
              id: obj.fullPath, // e.g. "published/uid/file.ext"
              name,
              url,
              kind,
              from: "uploads",
            };
          })
        );

        setMediaPool(items);
      } catch (err) {
        console.error("Failed to load uploads for media pool", err);
      }
    };

    loadUploads();
  }, [setMediaPool]);

  // 2) Add from device (local-only for this session)
  const handleChooseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      const mime = file.type || "";
      let kind: MediaItem["kind"] = "other";
      if (mime.startsWith("video/")) kind = "video";
      else if (mime.startsWith("image/")) kind = "image";

      addMedia({
        id: crypto.randomUUID(),
        name: file.name,
        url,
        kind,
        from: "device",
      });
    });

    e.target.value = "";
  };

  // 3) Permanent delete handler
  const handleDeleteItem = async (item: MediaItem) => {
    // If this came from Firebase uploads, delete the Storage object too
    if (item.from === "uploads") {
      try {
        const objRef = storageRef(storage, item.id); // id is fullPath
        await deleteObject(objRef);
      } catch (err) {
        console.error("Failed to delete storage object", err);
        // even if Storage delete fails, we still remove it from the pool
      }
    }

    // Always remove from local media pool
    removeMedia(item.id);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        height: "100%",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 10px",
          borderRadius: 10,
          border: `1px solid ${GOLD}`,
          background: CARD_BG,
          color: "#fff",
          fontSize: 13,
        }}
      >
        <span style={{ fontWeight: 600 }}>Media Pool</span>
        <button
          type="button"
          onClick={handleChooseFiles}
          style={{
            marginLeft: "auto",
            padding: "6px 10px",
            borderRadius: 999,
            border: `1px solid ${GOLD}`,
            background: GOLD,
            color: "#000",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          + Add from device
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*,image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFilesSelected}
        />
      </div>

      {/* Media grid */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "4px 2px 4px 0",
        }}
      >
        {mediaPool.length === 0 ? (
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,.7)",
              padding: "6px 4px",
            }}
          >
            No media yet. Upload on the <b>Upload</b> page or use{" "}
            <b>“+ Add from device”</b>, then drag the media cards onto the
            timelines.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 8,
            }}
          >
            {mediaPool.map((item) => (
              <MediaCard
                key={item.id}
                id={item.id}
                name={item.name}
                url={item.url}
                kind={item.kind}
                onDelete={() => handleDeleteItem(item)}
                onPreview={() => {
                  if (item.url) setPreviewUrl(item.url);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------
   MEDIA CARD (DRAGGABLE + DELETE)
   ---------------------------------------------------------- */

type MediaCardProps = {
  id: string;
  name: string;
  url?: string;
  kind?: "video" | "image" | "other";
  onDelete: () => void;
  onPreview: () => void;
};

function MediaCard({ id, name, url, kind, onDelete, onPreview }: MediaCardProps) {
  const isImage = kind === "image";
  const isVideo = kind === "video";

  return (
    <div
      draggable
      onDragStart={(e) => {
        // IMPORTANT: this matches TimelineCanvas onDrop (text/plain)
        e.dataTransfer.setData("text/plain", id);
      }}
      onClick={onPreview}
      style={{
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,.25)",
        background: CARD_BG,
        color: "#fff",
        fontSize: 11,
        overflow: "hidden",
        cursor: "grab",
        display: "flex",
        flexDirection: "column",
        minHeight: 120,
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          height: 80,
          background: "rgba(0,0,0,.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {url && (isImage || isVideo) ? (
          <img
            src={url}
            alt={name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              display: "block",
            }}
            draggable={false}
          />
        ) : (
          <div
            style={{
              fontSize: 24,
              opacity: 0.7,
            }}
          >
            📁
          </div>
        )}

        {/* Type badge */}
        <div
          style={{
            position: "absolute",
            left: 6,
            bottom: 6,
            padding: "2px 6px",
            borderRadius: 999,
            background: "rgba(0,0,0,.75)",
            border: "1px solid rgba(255,255,255,.35)", // <-- fixed quotes here
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {isVideo ? "Video" : isImage ? "Image" : "Other"}
        </div>
      </div>

      {/* Name + actions */}
      <div
        style={{
          padding: "6px 8px",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={name}
        >
          {name}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={{
            border: "none",
            borderRadius: 999,
            padding: "2px 6px",
            fontSize: 11,
            background: "rgba(255,60,60,.9)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>

      <div
        style={{
          padding: "0 8px 6px",
          fontSize: 10,
          color: "rgba(255,255,255,.6)",
        }}
      >
        Tip: drag this card onto <b>Video 1</b>, <b>Audio 1</b>, or{" "}
        <b>Overlay</b> lanes to add it to the timeline.
      </div>
    </div>
  );
}
