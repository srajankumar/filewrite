import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'File Sharing',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  );
}