"use client";

import React from "react";

const PostComposer: React.FC = () => {
  return (
    <div
      className="
        rounded-[24px]
        border-2 border-[#FFD700]
        bg-[#7B0F24]
        p-6
        text-[#FFF9F0]
        box-border
        w-full
        max-w-full
      "
    >
      {/* Title */}
      <h2 className="mb-4 text-2xl font-bold text-[#FFD700]">
        Create a social post
      </h2>

      {/* Post text area */}
      <div className="mb-6 rounded-2xl border-2 border-[#FFD700] p-3">
        <textarea
          placeholder="Share your thoughts, link an article, or introduce your latest video…"
          className="
            h-36
            w-full
            resize-y
            bg-transparent
            text-sm
            leading-snug
            text-[#FFF9F0]
            outline-none
            border-none
          "
        />
      </div>

      {/* Attached meme section */}
      <div className="mb-4 rounded-2xl border-2 border-dashed border-[#FFD700] p-4">
        <p className="mb-3 font-semibold text-[#FFD700]">Attached meme:</p>

        <div
          className="
            flex
            h-64
            items-center
            justify-center
            rounded-2xl
            bg-[#FFF9F0]
            px-4
            text-center
            text-sm
            text-[#666666]
            w-full
            max-w-full
          "
        >
          Meme placeholder (no image selected)
        </div>

        <p className="mt-2 text-xs opacity-80">
          Meme created in Meme Lab (with text overlay)
        </p>
      </div>

      {/* Footer: character count + buttons */}
      <div
        className="
          mt-3
          flex flex-wrap
          items-center
          justify-between
          gap-3
        "
      >
        <p className="text-xs opacity-80 md:text-sm">0/1500 characters</p>

        <div className="flex flex-wrap items-center gap-3">
          {/* MOBILE: smaller; TABLET+DESKTOP: larger (original) size */}
          <button
            className="
              rounded-full
              bg-[#FFD700]
              text-[#7B0F24]
              font-semibold
              text-xs px-3 py-1.5
              md:text-sm md:px-5 md:py-2.5
            "
          >
            Create a meme
          </button>

          <button
            className="
              rounded-full
              bg-[#FFD700]
              text-[#7B0F24]
              font-semibold
              text-xs px-3 py-1.5
              md:text-sm md:px-5 md:py-2.5
            "
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostComposer;
