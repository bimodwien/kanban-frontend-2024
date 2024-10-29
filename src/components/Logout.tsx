"use client";
import React from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/slices/user.slice";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axios";

const Logout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function loggingOut() {
    try {
      axiosInstance().post("/users/logout");
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.error("logging out failed", error);
    }
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
