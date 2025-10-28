import Header from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh max-w-xl mx-auto px-5 pb-20">
      <Header />
      {children}
    </div>
  );
}
