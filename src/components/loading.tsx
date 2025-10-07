"use client";
import React, { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { CircleAlert } from "lucide-react";

export default function Loading() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

    fetch(serverUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed flex justify-center select-none items-center bg-background border border-border text-sm px-5 py-3 rounded-md m-5 bottom-0 z-50 right-0">
          Connecting to server
          <Spinner/>
        </div>
      )}
      {error && (
        <div className="fixed flex justify-center select-none items-center bg-background border border-border text-sm px-5 py-3 rounded-md m-5 bottom-0 z-50 right-0">
          Server connection failed
          <CircleAlert className="h-5 w-5 ml-2 text-red-500"/>
        </div>
      )}
    </>
  );
}
