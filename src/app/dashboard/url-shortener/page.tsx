import UrlList from "@/components/url-shortener/url-list";
import UrlShortener from "@/components/url-shortener/url-shortener";
import React from "react";

export default function URLShortener() {
  return (
    <div className="grid gap-5">
      <h1 className="font-semibold text-2xl text-center py-5">URL Shortener</h1>
      <UrlShortener />
      <UrlList />
    </div>
  );
}
