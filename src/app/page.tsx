"use client";

import Header from "@/components/header";
import Hero from "@/components/landing-page/hero";
import FAQ from "@/components/landing-page/faq";
import Footer from "@/components/landing-page/footer";
import Feature from "@/components/landing-page/feature";
import CTA from "@/components/landing-page/cta";

export default function Page() {
  return (
    <main className="min-h-dvh max-w-xl mx-auto px-5">
      <Header />
      <Hero />
      <Feature/>
      <FAQ />
      <CTA/>
      <Footer />
    </main>
  );
}
