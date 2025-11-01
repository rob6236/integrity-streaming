// app/creator-studio/inbox/page.tsx
import { redirect } from "next/navigation";

export default function Page() {
  // Automatically send any visits to the correct route
  redirect("/creator-studio/comments-inbox");
}
