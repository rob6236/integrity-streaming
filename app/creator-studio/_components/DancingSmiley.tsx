"use client";

import React from "react";

type Props = {
  size?: number;            // overall size in pixels
  side?: "left" | "right";  // which side of the header
  className?: string;
};

export default function DancingSmiley({ size = 44, side = "left", className }: Props) {
  const flip = side === "right" ? 1 : -1;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: -6,                               // float slightly outside the header
        [side]: -6,                            // left:-6 or right:-6
        width: size,
        height: size,
        pointerEvents: "none",
        filter: "drop-shadow(0 2px 2px rgba(0,0,0,.35))",
        animation: "ds-bounce 1.8s ease-in-out infinite",
      } as React.CSSProperties}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{ display: "block" }}
        aria-hidden
      >
        {/* face */}
        <defs>
          <radialGradient id="dsFace" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#FFE08A" />
            <stop offset="100%" stopColor="#FFB22E" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill="url(#dsFace)" stroke="#7B0F24" strokeWidth="2.5" />

        {/* eyes */}
        <circle cx="36" cy="42" r="4.8" fill="#272424" />
        <circle cx="64" cy="42" r="4.8" fill="#272424" />

        {/* smile */}
        <path
          d="M30,58 C40,72 60,72 70,58"
          fill="none"
          stroke="#272424"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ animation: "ds-smile 1.8s ease-in-out infinite" }}
        />

        {/* arms (group for wiggle) */}
        <g
          style={{
            transformOrigin: "50px 50px",
            animation: "ds-arms 1.8s ease-in-out infinite",
          }}
          stroke="#7B0F24"
          strokeWidth="6"
          strokeLinecap="round"
        >
          {/* left arm */}
          <path
            d={`M 12 50 Q 8 ${30 + 5 * flip} 22 34`}
            fill="none"
          />
          {/* right arm */}
          <path
            d={`M 88 50 Q 92 ${30 - 5 * flip} 78 34`}
            fill="none"
          />
        </g>

        {/* legs (little step) */}
        <g
          style={{
            transformOrigin: "50px 72px",
            animation: "ds-legs 1.8s ease-in-out infinite",
          }}
          stroke="#7B0F24"
          strokeWidth="6"
          strokeLinecap="round"
        >
          {/* left leg */}
          <path d={`M 42 78 L ${42 - 12 * flip} 92`} />
          {/* right leg */}
          <path d={`M 58 78 L ${58 + 12 * flip} 92`} />
        </g>
      </svg>

      <style jsx>{`
        @keyframes ds-bounce {
          0%   { transform: translateY(0) rotate(0deg); }
          25%  { transform: translateY(-5px) rotate(${3 * flip}deg); }
          50%  { transform: translateY(0) rotate(0deg); }
          75%  { transform: translateY(-5px) rotate(${-3 * flip}deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes ds-arms {
          0%   { transform: rotate(0deg); }
          25%  { transform: rotate(${6 * flip}deg); }
          50%  { transform: rotate(0deg); }
          75%  { transform: rotate(${-6 * flip}deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ds-legs {
          0%   { transform: translateY(0) rotate(0deg); }
          25%  { transform: translateY(2px) rotate(${-4 * flip}deg); }
          50%  { transform: translateY(0) rotate(0deg); }
          75%  { transform: translateY(2px) rotate(${4 * flip}deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes ds-smile {
          0%   { d: path("M30,58 C40,72 60,72 70,58"); }
          50%  { d: path("M30,60 C40,68 60,68 70,60"); }
          100% { d: path("M30,58 C40,72 60,72 70,58"); }
        }
      `}</style>
    </div>
  );
}
