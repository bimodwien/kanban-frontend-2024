"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { keepLogin } from "@/lib/redux/middleware/auth.middleware";

type Props = { children: React.ReactNode };

const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState(false);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isLoaded) {
      dispatch(keepLogin()).finally(() => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, [dispatch, auth.isLoaded]);

  if (!isReady) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default AuthProvider;
