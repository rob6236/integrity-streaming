// app/creator-studio/thumbnail/page.tsx
import { redirect } from "next/navigation";

export default function LegacyThumbnailRoute() {
  // Automatically redirect the old /thumbnail route
  // to the new /thumbnail-designer page
  redirect("/creator-studio/thumbnail-designer");
  return null;
}
