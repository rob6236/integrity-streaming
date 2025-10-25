import Link from "next/link";

export type VideoItem = {
  id: string;
  title: string;
  channel: string;
  views: string;
  age: string;
  duration: string;
  href?: string;
};

const gold = "#FFD700";

export default function VideoCard({ video }: { video: VideoItem }) {
  return (
    <Link
      href={video.href || "#"}
      className="group block w-[280px] shrink-0"
      prefetch={false}
      aria-label={`Watch ${video.title}`}
    >
      <div
        className="relative h-[158px] w-[280px] overflow-hidden rounded-xl ring-1 transition group-hover:-translate-y-0.5 group-hover:shadow-lg"
        style={{
          ringColor: gold,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,215,0,0.15))",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm">
          Thumbnail
        </div>
        <div className="absolute bottom-2 right-2 rounded-md px-1.5 py-0.5 text-xs font-semibold text-black bg-white/90">
          {video.duration}
        </div>
      </div>

      <div className="mt-2">
        <h3 className="line-clamp-2 text-[15px] font-semibold text-white leading-snug">
          {video.title}
        </h3>
        <div className="mt-1 text-xs text-white/80">
          <p className="truncate">{video.channel}</p>
          <p className="truncate">
            {video.views} • {video.age}
          </p>
        </div>
      </div>
    </Link>
  );
}
