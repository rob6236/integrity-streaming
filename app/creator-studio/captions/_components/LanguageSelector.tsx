"use client";

import React from "react";
import { useCaptions } from "./utils";

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ar", label: "Arabic" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useCaptions();

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-yellow-300">
        Caption language
      </span>

      {/* Gold pill wrapper */}
      <div className="rounded-full border border-[#FFD700] bg-[#7B0F24] px-2 py-1">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-transparent border-none outline-none appearance-none text-center"
          // force bold white, bigger font
          style={{
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "1.05rem",
          }}
        >
          {LANGUAGE_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={{
                color: "#FFFFFF",
                backgroundColor: "#7B0F24",
              }}
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
