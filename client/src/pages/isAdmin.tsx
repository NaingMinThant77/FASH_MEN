import type { RootState } from "@/store";
import { useCurrentUserQuery } from "@/store/slices/userApi";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const IsAdmin = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const { isError, data: user } = useCurrentUserQuery();

  useEffect(() => {
    if (!userInfo || isError || user?.role !== "admin") {
      navigate("/");
    }
  }, [userInfo]);

  return <>{children}</>;
};

export default IsAdmin;
