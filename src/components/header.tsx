"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LogOut } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between py-10">
      <div className="flex items-center gap-1">
        <Link href={"/"} className="flex items-center gap-3 mr-2">
          <Image
            src={"/assets/logo-transparant.png"}
            alt="Filewrite"
            width={25}
            height={25}
          />
        </Link>
        <SignedIn>
          <Button
            className="md:text-sm text-xs tracking-wide"
            variant={
              pathname == "/dashboard/file-sharing" ? "secondary" : "ghost"
            }
            asChild
          >
            <Link href={"/dashboard/file-sharing"}>File Sharing</Link>
          </Button>
        </SignedIn>
        <SignedIn>
          <Button
            className="md:text-sm text-xs tracking-wide"
            variant={
              pathname == "/dashboard/url-shortener" ? "secondary" : "ghost"
            }
            asChild
          >
            <Link href={"/dashboard/url-shortener"}>URL Shortener</Link>
          </Button>
        </SignedIn>
      </div>
      <div className="flex items-center gap-1">
        <ModeToggle />
        <SignedIn>
          <SignOutButton>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="text-destructive hover:text-destructive"
            >
              <LogOut />
            </Button>
          </SignOutButton>
        </SignedIn>
      </div>
    </header>
  );
}
