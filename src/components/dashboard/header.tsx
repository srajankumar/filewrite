"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { LogOut } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-10">
      <div className="flex items-center gap-1">
        <Link href={"/dashboard"} className="flex size-9 items-center gap-3">
          <Image
            src={"/assets/logo-transparant.png"}
            alt="Filewrite"
            width={25}
            height={25}
          />
        </Link>
        <Button variant={"ghost"} asChild>
          <Link href={"/dashboard/file-sharing"}>File Sharing</Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href={"/dashboard/url-shortener"}>URL Shortener</Link>
        </Button>
      </div>
      <div className="flex items-center gap-1">
        <ModeToggle />
        <SignOutButton>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="text-destructive hover:text-destructive"
          >
            <LogOut />
          </Button>
        </SignOutButton>
      </div>
    </header>
  );
}
