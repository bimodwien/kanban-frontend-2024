"use client";

import React, { useEffect, useCallback } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { keepLogin } from "@/lib/redux/middleware/auth.middleware";

type Props = { children: React.ReactNode };

const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  const handleKeepLogin = useCallback(async () => {
    await dispatch(keepLogin());
  }, [dispatch]);

  useEffect(() => {
    handleKeepLogin();
  }, [handleKeepLogin]);

  return children;
};

export default AuthProvider;
