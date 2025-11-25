"use client";
import React from "react";
import { useSession } from "@/contexts/session-provider";

const Page = () => {
  const { user } = useSession();
  return (
    <div>
      Page1
      <span>{user?.email}</span>
    </div>
  );
};

export default Page;
