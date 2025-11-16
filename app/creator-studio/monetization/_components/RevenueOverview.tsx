"use client";

import React from "react";

const mockTopVideos = [
  {
    id: "1",
    title: "How to Edit Faster in Integrity Streaming",
    views: 12450,
    rpm: 3.75,
    revenue: 46.69,
  },
  {
    id: "2",
    title: "Creator Studio Tour (Full Walkthrough)",
    views: 8920,
    rpm: 2.9,
    revenue: 25.87,
  },
  {
    id: "3",
    title: "Overlay Tracks Explained in 5 Minutes",
    views: 5310,
    rpm: 4.1,
    revenue: 21.77,
  },
];

function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function RevenueOverview() {
  return (
    <div className="space-y-5 text-white">
      {/* Summary row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Total Revenue (Last 28 Days)
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">
            $0.00
          </div>
          <p className="mt-2 text-xs text-white/80">
            Once live data is connected, this will show your total revenue from
            all sources for the selected date range.
          </p>
        </div>

        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            RPM (All Content)
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">
            $0.00
          </div>
          <p className="mt-2 text-xs text-white/80">
            Revenue per 1,000 views across long-form, Shorts, and other formats.
          </p>
        </div>

        <div className="rounded-2xl border border-[#FFD700]/60 bg-[#7B0F24]/40 p-4 shadow-md shadow-black/40">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#FFD700]/90">
            Monetized Views
          </div>
          <div className="mt-2 text-3xl font-extrabold tracking-wide">0</div>
          <p className="mt-2 text-xs text-white/80">
            Number of views that showed ads or generated revenue in this period.
          </p>
        </div>
      </div>

      {/* Top earning videos */}
      <div className="rounded-3xl border border-[#FFD700]/50 bg-black/30 p-4 shadow-lg shadow-black/40">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-[#FFD700]">
            Top earning videos (sample layout)
          </h2>
          <span className="text-[11px] text-white/70">
            This table will be populated from your analytics later.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#FFD700]/30 text-[11px] uppercase tracking-wide text-white/70">
                <th className="py-2 pr-3">Video</th>
                <th className="px-3 py-2">Views</th>
                <th className="px-3 py-2">RPM</th>
                <th className="px-3 py-2">Estimated Revenue</th>
              </tr>
            </thead>
            <tbody>
              {mockTopVideos.map((video, index) => (
                <tr
                  key={video.id}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <td className="py-2 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#FFD700] to-[#FFE55C] text-[11px] font-bold text-[#7B0F24]">
                        {index + 1}
                      </div>
                      <div className="max-w-xs truncate text-[13px] font-semibold">
                        {video.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-[13px]">
                    {video.views.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-[13px]">
                    {formatCurrency(video.rpm)}
                  </td>
                  <td className="px-3 py-2 text-[13px] font-semibold text-[#FFD700]">
                    {formatCurrency(video.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tiny legend / explanation */}
        <p className="mt-3 text-[11px] text-white/70">
          Numbers above are placeholder examples. When wired up, this section
          will pull real data from your Integrity Streaming analytics so you can
          see exactly which videos are earning the most.
        </p>
      </div>
    </div>
  );
}
