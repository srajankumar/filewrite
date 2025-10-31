import React from "react";
import UrlShortener from "@/components/url-shortener/url-shortener";
import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "URL Shortener",
};

export default function URLShortener() {
  return (
    <div className="min-h-dvh max-w-xl mx-auto px-5 pb-20">
      <Header />
      <div className="grid gap-5">
        <h1 className="font-semibold text-2xl text-center py-5">
          URL Shortener
        </h1>
        <UrlShortener />
      </div>
    </div>
  );
}
