"use client";

import Link from "next/link";
import VideoCard, { VideoItem } from "./VideoCard";

const gold = "#FFD700";

export default function VideoRow({
  title,
  videos,
  viewAllHref = "#",
}: {
  title: string;
  videos: VideoItem[];
  viewAllHref?: string;
}) {
  return (
    <section className="mb-8">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-xl font-semibold text-white drop-shadow-sm">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="text-sm text-white/90 underline-offset-2 hover:underline"
        >
          View all
        </Link>
      </div>

      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        {videos.map((v) => (
          <div key={v.id} className="snap-start">
            <VideoCard video={v} />
          </div>
        ))}
      </div>

      <div
        className="mt-6 h-px w-full"
        style={{ backgroundColor: gold, opacity: 0.35 }}
      />
    </section>
  );
}
