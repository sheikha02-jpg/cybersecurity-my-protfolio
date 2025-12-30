"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post("/api/admin/logout");
      } catch (error) {
        console.error("Logout error:", error);
      }
      router.push("/admin/login");
    };
    logout();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-neutral-400">Logging out...</p>
    </div>
  );
}

