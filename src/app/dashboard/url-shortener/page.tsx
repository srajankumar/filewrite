import React from "react";
import UrlList from "@/components/url-shortener/url-list";
import UrlShortener from "@/components/url-shortener/url-shortener";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Shortener",
};

export default function URLShortener() {
  return (
    <div className="grid gap-5">
      <h1 className="font-semibold text-2xl text-center py-5">URL Shortener</h1>
      <UrlShortener />
      <UrlList />
    </div>
  );
}
