"use client";

import FAQ from "@/components/faq";
import FileUploader from "@/components/file-uploader";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import UrlShortener from "@/components/url-shortener";

export default function Page() {
  return (
    <main className="min-h-dvh max-w-xl mx-auto px-5">
      <Header />
      <Hero />
      <FileUploader />
      <UrlShortener/>
      <FAQ />
      <Footer />
    </main>
  );
}
