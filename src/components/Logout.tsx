"use client";
import React from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/slices/user.slice";
import { useRouter } from "next/navigation";

const Logout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function loggingOut() {
    dispatch(logout());
    router.push("/login");
  }

  return (
    <>
      <button
        onClick={() => {
          loggingOut();
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
