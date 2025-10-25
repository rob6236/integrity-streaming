import VideoRow from "@/components/VideoRow";
import type { VideoItem } from "@/components/VideoCard";

const burgundy = "#7B0F24";
const gold = "#FFD700";

/** Mock data for now. Replace with real data later. */
function mockVideos(prefix: string, count = 12): VideoItem[] {
  const items: VideoItem[] = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      id: `${prefix}-${i}`,
      title: `${prefix} Video ${i} — Example title for testing`,
      channel: `Channel ${i}`,
      views: `${Math.floor(Math.random() * 900) + 100}K views`,
      age: `${Math.floor(Math.random() * 11) + 1} days ago`,
      duration: `${Math.floor(Math.random() * 9) + 2}:${String(
        Math.floor(Math.random() * 59)
      ).padStart(2, "0")}`,
      href: "#",
    });
  }
  return items;
}

export default function HomePage() {
  // Rows you want on the homepage
  const suggested = mockVideos("Suggested");
  const history = mockVideos("History");
  const trending = mockVideos("Trending");
  const gaming = mockVideos("Gaming");
  const news = mockVideos("News");

  return (
    <main
      className="min-h-[100vh] text-white"
      style={{
        backgroundColor: burgundy,
        boxShadow: `inset 0 0 0 2px ${gold}`, // thin gold border around the whole page
      }}
    >
      {/* container with comfortable side padding (≈ ~1 inch on common laptop widths) */}
      <div className="mx-auto max-w-6xl px-6 py-6">
        {/* Video sections */}
        <div className="mb-10">
          <VideoRow title="Suggested for you" videos={suggested} viewAllHref="/videos/suggested" />
          <VideoRow title="Watch history" videos={history} viewAllHref="/videos/history" />
          <VideoRow title="Trending now" videos={trending} viewAllHref="/videos/trending" />
          <VideoRow title="Gaming" videos={gaming} viewAllHref="/videos/gaming" />
          <VideoRow title="News" videos={news} viewAllHref="/videos/news" />
        </div>

        {/* ---- Social Feed (LEAVE YOUR CURRENT CODE UNCHANGED) ---- */}
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-semibold text-white drop-shadow-sm">
            Social Feed
          </h2>

          {/* Replace this wrapper with your existing social feed JSX or component.
             If you already have <SocialFeed />, just render it here instead. */}
          <div
            className="rounded-2xl p-4 ring-1"
            style={{
              ringColor: gold,
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          >
            {/* ⬇️ REMOVE this placeholder and paste your current social section JSX here */}
            <p className="text-white/90">
              Your social feed renders here. (Temporary placeholder.)
            </p>
          </div>
        </section>
        {/* -------------------------------------------------------- */}
      </div>
    </main>
  );
}
