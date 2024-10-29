"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";

export const useAuthRedirect = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isLoaded) {
      return;
    }
    if (!auth.id) {
      router.push("/login");
    }
  }, [auth, router]);
};
