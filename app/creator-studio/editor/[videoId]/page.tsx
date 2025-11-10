"use client";
import dynamic from "next/dynamic";

const ExportRenderPanel = dynamic(
  () => import("./_components/ExportRenderPanel"),
  { ssr: false }
);

export default function DeliverLikeRenderPage() {
  return (
    <main className="mx-auto max-w-[1600px] text-white px-4 py-4">
      <h1 className="mb-3 text-lg font-semibold">Render</h1>
      <div className="rounded-2xl ring-1 ring-[#FFD700] bg-[#7B0F24]/70">
        <ExportRenderPanel />
      </div>
    </main>
  );
}
