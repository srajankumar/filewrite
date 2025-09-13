"use client";

import FAQ from "@/components/faq";
import FileUploader from "@/components/file-uploader";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-dvh max-w-xl mx-auto px-5">
      <Header />
      <Hero />
      <FileUploader />
      <FAQ />
      <Footer />
    </main>
  );
}
