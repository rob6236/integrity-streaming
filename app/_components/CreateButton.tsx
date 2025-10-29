"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth"; // <-- named import

const btn =
  "px-5 py-2 rounded-md border-2 border-[#FFD700] bg-white text-black font-semibold shadow-sm hover:bg-[#FFD700] hover:text-black transition-all";

export default function CreateButton() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <button
      className={btn}
      onClick={() => {
        if (user) {
          router.push("/studio"); // placeholder route until Studio exists
        } else {
          router.push("/login");
        }
      }}
    >
      Create
    </button>
  );
}
