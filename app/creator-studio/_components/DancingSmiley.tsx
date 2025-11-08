"use client";

import React from "react";

type Props = {
  size?: number;            // overall size in pixels
  side?: "left" | "right";  // which side of the header
  className?: string;
};

export default function DancingSmiley({ size = 44, side = "left", className }: Props) {
  const flip = side === "right" ? 1 : -1;

  // Brand colors
  const burgundy = "#7B0F24";
  const gold = "#FFD700";
  const black = "#000000";
  const dark = "#272424";

  // Hand / shoe sizes (scale a bit with icon size)
  const handR = Math.max(3.5, size * 0.06);
  const shoeR = Math.max(4.5, size * 0.07);

  // Limb endpoints (used for hands/shoes)
  const leftHand = { x: 22, y: 34 };
  const rightHand = { x: 78, y: 34 };
  const leftShoe = { x: 42 - 12 * flip, y: 92 };
  const rightShoe = { x: 58 + 12 * flip, y: 92 };

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: -6,
        [side]: -6,
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

        <circle cx="50" cy="50" r="42" fill="url(#dsFace)" stroke={burgundy} strokeWidth="2.5" />

        {/* eyes */}
        <circle cx="36" cy="42" r="4.8" fill={dark} />
        <circle cx="64" cy="42" r="4.8" fill={dark} />

        {/* smile (gold with subtle dark outline) */}
        <path
          d="M30,58 C40,72 60,72 70,58"
          fill="none"
          stroke={dark}
          strokeWidth="7"
          strokeLinecap="round"
          style={{ animation: "ds-smile 1.8s ease-in-out infinite" }}
        />
        <path
          d="M30,58 C40,72 60,72 70,58"
          fill="none"
          stroke={gold}
          strokeWidth="5"
          strokeLinecap="round"
          style={{ animation: "ds-smile 1.8s ease-in-out infinite" }}
        />

        {/* ARMS: black limbs, gold hands */}
        <g
          style={{
            transformOrigin: "50px 50px",
            animation: "ds-arms 1.8s ease-in-out infinite",
          }}
          fill="none"
          strokeLinecap="round"
        >
          {/* left arm (black) */}
          <path d={`M 12 50 Q 8 ${30 + 5 * flip} 22 34`} stroke={black} strokeWidth="6.5" />
          {/* right arm (black) */}
          <path d={`M 88 50 Q 92 ${30 - 5 * flip} 78 34`} stroke={black} strokeWidth="6.5" />
        </g>
        {/* hands (gold circles with dark outline) */}
        <circle cx={leftHand.x}  cy={leftHand.y}  r={handR} fill={gold} stroke={dark} strokeWidth="1.5" />
        <circle cx={rightHand.x} cy={rightHand.y} r={handR} fill={gold} stroke={dark} strokeWidth="1.5" />

        {/* LEGS: black limbs, gold shoes */}
        <g
          style={{
            transformOrigin: "50px 72px",
            animation: "ds-legs 1.8s ease-in-out infinite",
          }}
          fill="none"
          strokeLinecap="round"
        >
          {/* left leg (black) */}
          <path d={`M 42 78 L ${leftShoe.x} ${leftShoe.y}`} stroke={black} strokeWidth="7" />
          {/* right leg (black) */}
          <path d={`M 58 78 L ${rightShoe.x} ${rightShoe.y}`} stroke={black} strokeWidth="7" />
        </g>
        {/* shoes (gold circles with dark outline) */}
        <circle cx={leftShoe.x}  cy={leftShoe.y}  r={shoeR} fill={gold} stroke={dark} strokeWidth="1.8" />
        <circle cx={rightShoe.x} cy={rightShoe.y} r={shoeR} fill={gold} stroke={dark} strokeWidth="1.8" />
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
