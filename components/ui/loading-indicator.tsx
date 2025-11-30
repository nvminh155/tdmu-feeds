"use client";

import { useLinkStatus } from "next/link";
import { Spinner } from "./spinner";

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();
  if (pending) {
    // console.log("pending");
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <span aria-hidden className={`link-hint ${pending ? "is-pending" : ""}`} />
  );
}
