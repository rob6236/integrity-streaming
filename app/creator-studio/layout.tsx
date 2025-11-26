"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const BURGUNDY = "#7B0F24";
const GOLD = "#FFD700";
const PANEL_BG = "rgba(0,0,0,0.22)";
const OUTLINE = `0 0 0 3px ${GOLD}`;

export default function CreatorStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  const navClass = (href: string) =>
    `navBtn${isActive(href) ? " active" : ""}`;

  return (
    <div>
      <style>{`
        :root{
          --logo-box: 100px;          /* slightly smaller logo */
          --logo-inset: 6px;
          --logo-radius: 18px;
          --nav-col: 220px;
        }

        html, body, #__next { background:${BURGUNDY}; color:#fff; }
        a { text-decoration:none; }

        .gold-outline { box-shadow:${OUTLINE}; border-radius:16px; }

        .gold-btn {
          box-shadow:${OUTLINE};
          background:${PANEL_BG};
          border-radius:999px;
          padding:6px 16px;
          color:#fff;
          font-weight:800;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border:2px solid ${GOLD};
          font-size:14px;
          line-height:1.1;
          white-space:nowrap;
        }

        /* ============================
           CREATOR STUDIO HEADER
           (shorter overall + top padding space)
           ============================ */

        .creator-header{
          width:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:14px;                     /* was 18px */
          background:linear-gradient(180deg, rgba(0,0,0,0.18), rgba(0,0,0,0.12));
          border-radius:24px;
          padding:12px 18px 16px;       /* less vertical padding */
          margin-top:16px;              /* <— space above the header */
        }

        .logoBox{
          width:var(--logo-box);
          height:var(--logo-box);
          border-radius:var(--logo-radius);
          background:#fff;
          display:grid;
          place-items:center;
          box-shadow:0 0 0 4px ${GOLD} inset, 0 0 0 3px ${GOLD};
          padding:var(--logo-inset);
        }
        .logoImg{
          width:100%;
          height:100%;
          object-fit:contain;
          border-radius:10px;
          display:block;
        }

        .title{
          text-align:center;
          line-height:1.06;
          font-style:italic;
          font-weight:900;
          color:${GOLD};
          text-shadow:2px 2px 0 #4a0b16, 3px 3px 0 rgba(0,0,0,0.55);
          margin:0;
        }
        .title .top{ font-size:32px; }   /* slightly smaller */
        .title .bottom{ font-size:20px; }

        .header-actions{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:16px;
          flex-wrap:nowrap;              /* keep all three in one row */
        }

        /* PAGE GRID */
        .page{
          max-width:1200px;
          margin:20px auto 0;
          padding:0 16px 40px;
          display:grid;
          grid-template-columns:var(--nav-col) 1fr;
          gap:20px;
        }

        /* SIDENAV */
        .sidenav{
          width:var(--nav-col);
          display:flex;
          flex-direction:column;
          gap:12px;
          position:sticky;
          top:18px;
          height:fit-content;
        }

        .navBtn{
          display:block;
          width:100%;
          text-align:left;
          padding:8px 12px;
          border-radius:12px;
          background:${GOLD};
          color:#000;
          font-weight:900;
          font-size:15px;
          line-height:1.15;
          box-shadow:${OUTLINE};
          transition:filter .15s ease, transform .02s ease, background .15s ease;
        }

        .navBtn:hover{ filter:brightness(0.97); }
        .navBtn:active{ transform:translateY(1px); }
        .navBtn.active{
          background:#fff;
          color:#000;
        }

        /* Tablet tweaks */
        @media (max-width:980px){
          .page{ grid-template-columns:1fr; }
          .sidenav{ width:100%; position:static; }
          .title .top{ font-size:28px; }
          .title .bottom{ font-size:18px; }
          :root{ --logo-box: 90px; }
        }

        /* MOBILE ONLY:
           even shorter header + skinny sidebar
        */
        @media (max-width:639px){
          :root{
            --nav-col: 96px;
            --logo-box: 82px;
          }

          .creator-header{
            padding:10px 12px 12px;   /* shorter */
            gap:10px;                  /* tighter vertical spacing */
            margin-top:16px;           /* keep same space above on mobile */
          }

          .title .top{ font-size:24px; }
          .title .bottom{ font-size:16px; }

          .gold-btn{
            padding:4px 8px;
            font-size:11px;
          }

          .header-actions{
            gap:8px;
          }

          /* KEY CHANGE: lock the body width & kill horizontal scroll */
          .page{
            grid-template-columns: var(--nav-col) minmax(0, 1fr);
            padding:0 8px 32px;        /* slightly less side padding */
            overflow-x:hidden;
          }

          .page main{
            width:100%;
            max-width:100%;
            overflow-x:hidden;         /* nothing in the body can cause horizontal scroll */
          }

          .sidenav{
            width:var(--nav-col);
            position:static;
          }

          .navBtn{
            font-size:11px;
            padding:6px 6px;
          }
        }
      `}</style>

      {/* HEADER – between smileys via .header-shell */}
      <div className="header-shell">
        <div className="creator-header gold-outline">
          <div className="logoBox">
            <Image
              src="/logo.png"
              alt="Integrity Streaming"
              width={220}
              height={220}
              className="logoImg"
              priority
            />
          </div>

          <div className="title">
            <div className="top">Integrity Streaming</div>
            <div className="bottom">Creator Studio</div>
          </div>

          <div className="header-actions">
            <Link href="/home" className="gold-btn">
              Home
            </Link>
            <Link href="/channel/sample" className="gold-btn">
              View Channel
            </Link>
            <Link href="/logout" className="gold-btn">
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="page">
        <nav className="sidenav">
          <Link
            href="/creator-studio/dashboard"
            className={navClass("/creator-studio/dashboard")}
          >
            Dashboard
          </Link>
          <Link
            href="/creator-studio/library"
            className={navClass("/creator-studio/library")}
          >
            Content Library
          </Link>
          <Link
            href="/creator-studio/upload"
            className={navClass("/creator-studio/upload")}
          >
            Upload
          </Link>
          <Link
            href="/creator-studio/editor"
            className={navClass("/creator-studio/editor")}
          >
            Editor
          </Link>
          <Link
            href="/creator-studio/thumbnail-designer"
            className={navClass("/creator-studio/thumbnail-designer")}
          >
            Thumbnail Designer
          </Link>
          {/* Captions link removed */}
          <Link
            href="/creator-studio/monetization"
            className={navClass("/creator-studio/monetization")}
          >
            Monetization
          </Link>
          <Link
            href="/creator-studio/posts"
            className={navClass("/creator-studio/posts")}
          >
            Posts (Social)
          </Link>
          <Link
            href="/creator-studio/comments-inbox"
            className={navClass("/creator-studio/comments-inbox")}
          >
            Comments / Inbox
          </Link>
          <Link
            href="/creator-studio/settings"
            className={navClass("/creator-studio/settings")}
          >
            Settings
          </Link>
          <Link
            href="/creator-studio/billing"
            className={navClass("/creator-studio/billing")}
          >
            Billing
          </Link>
        </nav>

        <main>{children}</main>
      </div>
    </div>
  );
}
