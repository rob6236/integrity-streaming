// app/creator-studio/content-library/page.tsx
import { redirect } from "next/navigation";

export default function ContentLibraryAliasPage() {
  // Old path → new path
  redirect("/creator-studio/library");
}
