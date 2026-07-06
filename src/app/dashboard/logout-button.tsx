"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container-low transition-colors"
      title="Logout"
    >
      <span className="material-symbols-outlined text-xl">logout</span>
    </button>
  );
}
